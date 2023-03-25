import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";


export const AuthContext = createContext();

// 共有する値を設定
export function AuthProvider({ children }) {
  const [ user, setUser ] = useState("");
  const [ signInCheck, setSignInCheck ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  // 現在ログインしているユーザー情報を取得
  useEffect(() => {
    setLoading(false);
    onAuthStateChanged(auth, (user) => {
      setLoading(true);
      setUser(user);
    });
  }, []);

  // ユーザ情報とログイン状態
  const userLoggedInState = (user, signIn) => {
    setSignInCheck(signIn);
    setUser(user);
  };

  const postServer = (a, b, c, d, e) => {
    // POST情報を設定
    const postParameter = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        a,
        b,
        c,
        d,
        e
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
      url: "http://localhost:3000" + url,
      handleCodeInApp: false
    };
    return actionCodeSettings;
  }

  // 共有する値
  const value = {
    user,
    setUser,
    signInCheck,
    setSignInCheck,
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