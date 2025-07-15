import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, requiredRole }) {
  const [status, setStatus] = useState({ 
    loading: true, 
    authenticated: false, 
    hasRequiredRole: false,
    userRole: null 
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("Usuário não autenticado");
        setStatus({ 
          loading: false, 
          authenticated: false, 
          hasRequiredRole: false,
          userRole: null 
        });
        return;
      }

      try {
        console.log("Verificando permissões para usuário:", user.uid);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userRole = userData.role;
          
          console.log("Role do usuário:", userRole);
          console.log("Role requerida:", requiredRole);
          
          const hasRequiredRole = requiredRole ? userRole === requiredRole : true;
          
          setStatus({
            loading: false,
            authenticated: true,
            hasRequiredRole,
            userRole
          });
        } else {
          console.error("Documento do usuário não encontrado");
          setStatus({
            loading: false,
            authenticated: false,
            hasRequiredRole: false,
            userRole: null
          });
        }
      } catch (error) {
        console.error("Erro ao verificar permissões:", error);
        setStatus({
          loading: false,
          authenticated: false,
          hasRequiredRole: false,
          userRole: null
        });
      }
    });

    return unsubscribe;
  }, [requiredRole]);

  if (status.loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Verificando permissões...</div>
      </div>
    );
  }

  if (!status.authenticated) {
    console.log("Redirecionando para login - não autenticado");
    return <Navigate to="/login" replace />;
  }

  if (!status.hasRequiredRole) {
    console.log("Redirecionando para login - sem permissão");
    // Redireciona para o painel apropriado baseado no role do usuário
    if (status.userRole === "admin") {
      return <Navigate to="/painel-admin" replace />;
    } else if (status.userRole === "doador") {
      return <Navigate to="/painel-doador" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  console.log("Acesso liberado para:", status.userRole);
  return children;
}