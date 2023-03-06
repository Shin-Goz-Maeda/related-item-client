import React, { useRef, useState } from 'react'
import { auth, googleProvider } from "../../../common/firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { GoogleSignInButton } from "../../components/atoms/Button";

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [ error, setError ] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
    .then (() => {navigate("/")})
    .catch((error) => {
      switch ( error.code) {
        case "auth/invalid-email":
          setError("正しいメールアドレスの形式で入力してください。");
          break;
        case "auth/user-not-found":
          setError("メールアドレスかパスワードに誤りがあります。");
          break;
        case "auth/wrong-password":
          setError("メールアドレスかパスワードに誤りがあります。");
          break;
        default:
          setError("メールアドレスかパスワードに誤りがあります。");
          break;
      }
    });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id='email'
            name='email'
            placeholder='email'
            ref={emailRef}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id='password'
            name='password'
            placeholder='password'
            ref={passwordRef}
          />
        </div>
        <button>ログイン</button>
      </form>
      <div>
        <p>--------------------------------------------</p>
      </div>
      <div>
        <GoogleSignInButton onClick={signInWithGoogle}>Googleでログイン</GoogleSignInButton>
      </div>
      <div></div>
      <div>
          ユーザ登録は<Link to="/signup">こちら</Link>から
        </div>
    </div>
  )
}

export default Login