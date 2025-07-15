import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import ItemCard from "./ItemCard";
import ObjectForm from "./ObjectForm";
import Navbar from "./Navbar";
import { FiGift, FiCheckCircle } from "react-icons/fi";

export default function DoadorPanel() {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const loadDonations = async () => {
    if (!auth.currentUser) return;
    setIsLoading(true);
    const q = query(collection(db, "objetos"), where("userId", "==", auth.currentUser.uid));
    const snap = await getDocs(q);
    setDonations(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      try {
        await deleteDoc(doc(db, "objetos", id));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 1800);
        loadDonations();
      } catch (e) {
        console.error("Erro ao excluir documento: ", e);
      }
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  const handleDonationSent = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      loadDonations(); // Recarrega a lista após enviar uma nova doação
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="panel-container" aria-label="Painel do Doador">
        <div className="panel-header">
          <FiGift className="panel-icon" size={36} />
          <h2>Bem-vindo, <span style={{ color: "#28a745" }}>Doador</span>!</h2>
          <span className="panel-description">
            <FiCheckCircle style={{ verticalAlign: "middle" }} /> Cadastre e acompanhe suas doações.
          </span>
        </div>
        <hr className="panel-divider" />
        <div className="panel-content">
          <div className="form-section">
            <ObjectForm onSent={handleDonationSent} />
          </div>
          <div className="list-section">
            <h3>Suas Doações</h3>
            {isLoading ? (
              <p className="info-text">Carregando suas doações...</p>
            ) : donations.length === 0 ? (
              <p className="info-text">Você ainda não fez nenhuma doação.</p>
            ) : (
              <div className="item-list" role="list">
                {donations.map(item => (
                  <ItemCard key={item.id} item={item} onApprove={() => { }} onReject={() => handleDelete(item.id)} isDoadorPanel />
                ))}
              </div>
            )}
          </div>
        </div>
        {showToast && <div className="toast">Ação realizada com sucesso!</div>}
      </div>
    </>
  );
}