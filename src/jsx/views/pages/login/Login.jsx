import { useRef, useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup, onAuthStateChanged} from "firebase/auth";
import { HOST_DOMAIN } from '../../../common/constant/constants';
import { AuthContext } from "../../../common/context/AuthContext";
import { GoogleAuthButton } from "../../components/atoms/Button";
import { auth, googleProvider } from "../../../common/firebase/firebase";

function Login() {
  const { setUser, setSignInCheck } = useContext(AuthContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [ error, setError ] = useState();
  const navigate = useNavigate();

    // サブミット時の処理
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const postParameter = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }
    await fetch(HOST_DOMAIN + "/login", postParameter)
    .then((response) => response.json())
    .then((result) => {
      setSignInCheck(true);
      setUser(result.user)
      console.log(result.user)
      if(result.user) {
        navigate("/")
      }
    })
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

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      setSignInCheck(true);
      setUser(result.user);
      navigate("/")
    })
    .catch((error) => {
      console.log(error.message)
    })
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("ユーザ内")
      }
      console.log("レンダリング後")
    })
  }, [])

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
      <div>----------------------</div>
      <div onClick={handleGoogleSignIn}>
        <GoogleAuthButton>Googleアカウントでログイン</GoogleAuthButton>
      </div>
      <div>
        ユーザ登録は<Link to="/signup">こちら</Link>から
      </div>
    </div>
  )
}

export default Login;