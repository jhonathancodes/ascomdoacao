import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function ObjectForm({ onSent }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("Você precisa estar logado para doar.");
      return;
    }
    try {
      await addDoc(collection(db, "objetos"), {
        title,
        description: desc,
        phone,
        userId: auth.currentUser.uid,
        status: "pendente",
        createdAt: Date.now()
      });
      setTitle("");
      setDesc("");
      setPhone("");
      onSent(); // Chama a função para notificar o componente pai
    } catch (e) {
      console.error("Erro ao adicionar doação: ", e);
      alert("Ocorreu um erro ao enviar sua doação.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="donation-form">
      <h3>Doar um Objeto</h3>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" required />
      <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Descrição" required />
      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefone" required />
      <button type="submit">Enviar para aprovação</button>
    </form>
  );
}