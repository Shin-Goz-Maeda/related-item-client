import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../common/context/AuthContext";

// ログインorサインアップを行った状態しかアクセスできないようにする処理
function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (<Navigate to="login" />)
  }
  return children;
}

export default PrivateRoute;