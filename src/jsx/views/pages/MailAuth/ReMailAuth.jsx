import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../common/context/AuthContext";
import { HOST_DOMAIN } from "../../../common/constant/constants";

// メール認証ページからしか認証メールの再送ができないようにする。
// ホームから認証できない場合は、メールで問い合わせてもらう。


function ReMailAuth() {
  const [ success, setSuccess ] = useState();
  const [ eroor, setError ] = useState();
  const { setUser, setSignInCheck } = useContext(AuthContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSendAuthMail = async(event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const postParameter = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
      })
    };

    await fetch(HOST_DOMAIN + "/resend-auth-mail", postParameter)
      .then((response) => response.json())
      .then((result) => {
        setSignInCheck(true);
        setUser(result.user);
        console.log(result.user)
        setSuccess("認証メールを送信しました。");
      })
      .catch((err) => {
        setError("入力情報をご確認ください");
      })
  };

  return (
    <>
      <div>
        <h1>メール認証を下記から行ってください。</h1>
        <form onSubmit={handleSendAuthMail}>
          {success && <p style={{ color: "blue" }}>{success}</p>}
          <div>
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              ref={emailRef}
            />
          </div>
          <div>
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              ref={passwordRef}
            />
          </div>
          <button>再設定メールを送信</button>
        </form>
      </div>
      <div>
        ログインは<Link to="/login">こちら</Link>から
      </div>
    </>
  );
};


export default ReMailAuth;