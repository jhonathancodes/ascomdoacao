import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import ItemCard from "./ItemCard";
import Navbar from "./Navbar";
import { FiUsers, FiCheckCircle, FiClock } from "react-icons/fi";

export default function AdminPanel() {
  const [objs, setObjs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const loadPendentes = async () => {
    setIsLoading(true);
    const q = query(collection(db, "objetos"), where("status", "==", "pendente"));
    const snap = await getDocs(q);
    setObjs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setIsLoading(false);
  };

  useEffect(() => {
    loadPendentes();
  }, []);

  const aprovar = async id => {
    await updateDoc(doc(db, "objetos", id), { status: "aprovado" });
    setToastMsg("Item aprovado com sucesso!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
    loadPendentes();
  };

  const rejeitar = async id => {
    if (window.confirm("Tem certeza que deseja rejeitar e excluir este item?")) {
      await deleteDoc(doc(db, "objetos", id));
      setToastMsg("Item rejeitado e removido.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1800);
      loadPendentes();
    }
  };

  return (
    <>
      <Navbar />
      <div className="panel-container" aria-label="Painel do Administrador">
        <div className="panel-header">
          <FiUsers className="panel-icon" size={36} />
          <h2>Painel do <span style={{ color: "#007bff" }}>Administrador</span></h2>
          <span className="panel-description">
            <FiClock style={{ verticalAlign: "middle" }} /> Itens de doação <strong>pendentes</strong> aguardando aprovação.
          </span>
        </div>
        <hr className="panel-divider" />
        {isLoading ? (
          <p className="info-text">Carregando itens...</p>
        ) : objs.length === 0 ? (
          <p className="info-text">Sem itens pendentes no momento.</p>
        ) : (
          <div className="item-list" role="list">
            {objs.map(o => (
              <ItemCard key={o.id} item={o} onApprove={() => aprovar(o.id)} onReject={() => rejeitar(o.id)} />
            ))}
          </div>
        )}
        {showToast && <div className="toast">{toastMsg}</div>}
      </div>
    </>
  );
}