import { createContext, useState } from "react";

export const AuthContext = createContext();

// 共通する値を設定
export function AuthProvider({ children }) {
  const [ user, setUser ] = useState("");
  const [ signInCheck, setSignInCheck ] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = {
    user,
    setUser,
    signInCheck,
    setSignInCheck
  };

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}