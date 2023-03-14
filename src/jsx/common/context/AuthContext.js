import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../common/firebase/firebase";

export const AuthContext = createContext();

// 共通する値を設定
export function AuthProvider({ children }) {
  const [ user, setUser ] = useState("");
  const [ signInCheck, setSignInCheck ] = useState(false);
  const [ userState, setUserState ] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = {
    user,
    setUser,
    signInCheck,
    setSignInCheck,
    userState,
    setUserState,
  };

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}