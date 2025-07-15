import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Auth.css";
import logo from "../assets/logo.jpeg";
import kidsImage from "../assets/kids.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [phone, setPhone] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async () => {
    try {
      setErro("");
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/painel-doador");
    } catch (e) {
      setErro("Email ou senha incorretos");
    }
  };

  const handleRegister = async () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const resetForm = () => {
    setEmail("");
    setSenha("");
    setPhone("");
    setErro("");
    setSucesso("");
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="auth-split">
      <div className="auth-image-side">
        <img src={kidsImage} alt="Crianças" />
      </div>

      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <img src={logo} alt="Logo" className="auth-logo" />

          <h2 className="welcome-title">Bem-vindo!</h2>
          <p className="welcome-subtext">Faça já sua doação e contribua.</p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            required
          />

          {!isLogin && (
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefone (ex: 11999999999)"
              required
            />
          )}

          {erro && <div className="error">{erro}</div>}
          {sucesso && <div className="success">{sucesso}</div>}

          <button type="submit" className="auth-button">
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>

          <div className="auth-toggle">
            <span>
              {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
              <button
                type="button"
                onClick={toggleMode}
                className="toggle-button"
              >
                {isLogin ? "Cadastre-se" : "Faça login"}
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
