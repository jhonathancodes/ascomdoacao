import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import DoadorPanel from "./components/DoadorPanel";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          console.log("Tentando buscar dados do usuário:", currentUser.uid);
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("Dados do usuário encontrados:", userData);
            setUserRole(userData.role);
          } else {
            console.error("Documento do usuário não encontrado no Firestore");
            setUserRole("doador");
          }
          setUser(currentUser);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
          console.error("Código do erro:", error.code);
          console.error("Mensagem do erro:", error.message);
          setUserRole("doador");
          setUser(currentUser);
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Carregando...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Rota de login - sempre acessível */}
          <Route path="/login" element={<Login />} />

          {/* Rota raiz - redireciona para login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Painel do doador */}
          <Route
            path="/painel-doador"
            element={
              <PrivateRoute requiredRole="doador">
                <DoadorPanel />
              </PrivateRoute>
            }
          />

          {/* Painel do admin */}
          <Route
            path="/painel-admin"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminPanel />
              </PrivateRoute>
            }
          />

          {/* Rota catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
