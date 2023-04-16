import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { CLIENT_DOMAIN } from "../constant/Constant";


export const AuthContext = createContext();


// 共有する値を設定
export function AuthProvider({ children }) {
  const [ user, setUser ] = useState(null);
  const [ signInCheck, setSignInCheck ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  // ユーザ情報とログイン状態
  const userLoggedInState = (signIn, user) => {
    setSignInCheck(signIn);
    setUser(user);
  };

  //　サーバーへのPOST情報
  const postServer = (email, password, uuid, provider) => {
    // POST情報を設定
    const postParameter = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        uuid,
        provider
      })
    };
    return postParameter;
  };

  // エラー種別判定
  const catchError = (error) => {
    switch (error.code) {
      case "auth/invalid-email":
        const invalidMail= "正しいメールアドレスの形式で入力してください。";
        return invalidMail;
      case "auth/user-not-found":
        const notFound = "メールアドレスかパスワードに誤りがあります。";
        return notFound;
      case "auth/wrong-password":
        const wrongPass = "メールアドレスかパスワードに誤りがあります。";
        return wrongPass;
      case "auth/too-many-requests":
        const tooManyRequest = "パスワードリセットのリクエストが多すぎます。時間をおいて再度お試しください。";
        return tooManyRequest;
      default:
        const somethingWrong = "メールアドレスかパスワードに誤りがあります。";
        return somethingWrong;
    };
  };

  // アクションコード
  const actionSetting = (url) => {
    // パスワード再設定メールからパスワードを再設定後にどこへアクセスするかを指定
    const actionCodeSettings = {
      //パスワード再設定後のリダイレクトURL
      url: CLIENT_DOMAIN + url,
      handleCodeInApp: false
    };
    return actionCodeSettings;
  };

  // 現在ログインしているユーザー情報を取得
  useEffect(() => {
    if (!signInCheck) {
      setLoading(false);
      onAuthStateChanged(auth, (user) => {
        setLoading(true);
        setUser(user);
      });
    };
  }, []);

  // 共有する値
  const value = {
    user,
    postServer,
    catchError,
    actionSetting,
    userLoggedInState
  };

  // loadingがtrueの時だけvalueを渡す
  return(
    <AuthContext.Provider value={value}>
      {loading && children}
    </AuthContext.Provider>
  );
};