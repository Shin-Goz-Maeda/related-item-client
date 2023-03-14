import { useRef, useState, useContext } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { signInWithPopup, sendEmailVerification } from "firebase/auth";
import { HOST_DOMAIN } from '../../../common/constant/constants';
import { AuthContext } from "../../../common/context/AuthContext";
import { GoogleAuthButton } from "../../components/atoms/Button";
import { auth, googleProvider } from "../../../common/firebase/firebase";

function SignUp() {
  const { user, setUser, setSignInCheck, userState, setUserState } = useContext(AuthContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [ error, setError ] = useState("");

  // サブミット時の処理
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUserState(0);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const createdAt = Date.now();
    const updatedAt = Date.now();

    const postParameter = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        userState,
        createdAt,
        updatedAt
      })
    }
    await fetch(HOST_DOMAIN + "/signup", postParameter)
      .then((response) => response.json())
      .then((result) => {
        setSignInCheck(true);
        setUser(result.user);
        console.log(result.user)
        if(result.user) {
          navigate("/")
        }
      })
      .catch((error)  => {
        console.log(error);
        switch (error.code) {
          case "auth/invaid-email":
            setError("正しいメールアドレスの形式で入力してください。");
            break;
          case "auth/weak-password":
            setError("パスワードは６文字以上を設定する必要があります。");
            break;
          case "auth/email-already-in-use":
            setError("そのメールアドレスは登録済みです。");
            break;
          default:
            setError("メールアドレスかパスワードに誤りがあります。");
            break;
        }
      });
  };

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      setSignInCheck(true);
      setUser(result.user)
      navigate("/")
    })
    .catch((error) => {
      console.log(error.message)
    })
  };

  return (
    <div>
      <h1>アカウント登録</h1>
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
        <button>登録</button>
      </form>
      <div>----------------------</div>
      <div onClick={handleGoogleSignUp}>
        <GoogleAuthButton>Googleアカウントで登録</GoogleAuthButton>
      </div>
      <div>
        ログインは<Link to="/login">こちら</Link>から
      </div>
    </div>
  )
};

export default SignUp;