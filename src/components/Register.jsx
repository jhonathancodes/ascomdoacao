import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [phone, setPhone] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      setErro("");
      setSucesso("");
      
      
      if (!email || !senha || !phone) {
        setErro("Preencha todos os campos");
        return;
      }
      
      if (senha.length < 6) {
        setErro("A senha deve ter pelo menos 6 caracteres");
        return;
      }

      
      const { user } = await createUserWithEmailAndPassword(auth, email, senha);
      
    
      await setDoc(doc(db, "users", user.uid), {
        role: "doador",
        phone: phone,
        email: email,
        createdAt: Date.now()
      });
      
      setSucesso("Conta criada com sucesso! Redirecionando...");
      
     
      setTimeout(() => {
        navigate("/painel-doador");
      }, 1500);
      
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setErro("Este email já está em uso");
      } else if (e.code === "auth/weak-password") {
        setErro("A senha é muito fraca");
      } else if (e.code === "auth/invalid-email") {
        setErro("Email inválido");
      } else {
        setErro("Erro ao criar conta: " + e.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h2>Cadastrar Doador</h2>
        
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email" 
          required
        />
        
        <input 
          type="password" 
          value={senha} 
          onChange={e => setSenha(e.target.value)} 
          placeholder="Senha" 
          required
        />
        
        <input 
          type="tel" 
          value={phone} 
          onChange={e => setPhone(e.target.value)} 
          placeholder="Telefone (ex: 11999999999)" 
          required
        />
        
        {erro && <div className="error">{erro}</div>}
        {sucesso && <div className="success">{sucesso}</div>}
        
        <button type="submit" className="auth-button">
          Cadastrar
        </button>
        
        <div className="auth-toggle">
          <span>
            Já tem uma conta? 
            <button 
              type="button" 
              onClick={() => navigate("/login")}
              className="toggle-button"
            >
              Faça login
            </button>
          </span>
        </div>
      </form>
    </div>
  );

}
