import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../common/context/AuthContext";


// ログインorサインアップを行った状態しかアクセスできないようにする処理
function PrivateRoute({ children }) {
  // 共通のユーザ情報を取得
  const { user } = useContext(AuthContext);
  if (!user) {
    // ユーザー情報が空の場合はログインページへ
    return (<Navigate to="login" />);
  };
  return children;
};


export default PrivateRoute;