import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase fornecida
const firebaseConfig = {
  apiKey: "AIzaSyC1s1c129ZFiemW4KoI5-Ct7NJj7dbwGJ0",
  authDomain: "ascomdoacoes.firebaseapp.com",
  projectId: "ascomdoacoes",
  storageBucket: "ascomdoacoes.firebasestorage.app",
  messagingSenderId: "790533731579",
  appId: "1:790533731579:web:b54534305572b0902c6c5e",
  measurementId: "G-HWF2FVV5Z6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar autenticação e banco de dados
export const auth = getAuth(app);
export const db = getFirestore(app);
