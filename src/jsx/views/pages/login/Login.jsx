import { useRef, useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { HOST_DOMAIN } from '../../../common/constant/constants';
import { AuthContext } from "../../../common/context/AuthContext";

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
    .then((data) => {
      setUser(data.user)
      setSignInCheck(true);
      if(data.user) {
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
        <div>
          ユーザ登録は<Link to="/signup">こちら</Link>から
        </div>
      </form>
    </div>
  )
}

export default Login;