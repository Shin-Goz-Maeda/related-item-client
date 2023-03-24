import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext();

// 共通する値dを設定
export function AuthProvider({ children }) {
  const [ user, setUser ] = useState("");
  const [ signInCheck, setSignInCheck ] = useState(false);

  const value = {
    user,
    setUser,
    signInCheck,
    setSignInCheck
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });
  }, []);

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};