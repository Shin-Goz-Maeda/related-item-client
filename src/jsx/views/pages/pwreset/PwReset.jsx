import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../common/context/AuthContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../common/firebase/firebase";
import Header from "../../components/blocks/header/Header";


function PwReset() {
  const { user } = useContext(AuthContext);
  const emailRef = useRef(null);
  const [ setError ] = useState();
  const [ success, setSuccess ] = useState();
  const navigate = useNavigate();

  const handleChangePasswordLogged = async (event) => {
    event.preventDefault();
    const email = user.email;

    const actionCodeSettings = {
      //パスワード再設定後のリダイレクトURL
      url: "http://localhost:3000/",
      handleCodeInApp: false
    };

    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        setSuccess("パスワード再設定メールを送信しました。");
        setTimeout(() => {
          navigate("/");
        }, 5000);
      });
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;

    const actionCodeSettings = {
      //パスワード再設定後のリダイレクトURL
      url: "http://localhost:3000/login",
      handleCodeInApp: false
    };

    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        setSuccess("パスワード再設定メールを送信しました。");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      })
      .catch((err) => {
        console.log(err.message);
        setError("メールアドレスを確認してください。");
      });
  };

  return (
    <>
      {user ?
        <>
          <Header />
          <div>
            <h1>パスワードリセット</h1>
            <form onSubmit={handleChangePasswordLogged}>
              {success && <p style={{ color: "blue" }}>{success}</p>}
              <button>再設定メールを送信</button>
            </form>
          </div>
        </> :
        <div>
          <h1>パスワードリセット</h1>
          <form onSubmit={handleChangePassword}>
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
            <button>再設定メールを送信</button>
          </form>
          <div>----------------------</div>
          <div>
            ログインは<Link to="/login">こちら</Link>から
          </div>
        </div>
      }
    </>
  );
};


export default PwReset;