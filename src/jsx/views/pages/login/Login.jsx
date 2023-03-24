import { useRef, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../common/context/AuthContext";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { auth, googleProvider } from "../../../common/firebase/firebase";
import { HOST_DOMAIN } from "../../../common/constant/constants";
import { GoogleAuthButton } from "../../components/atoms/Button";


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
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    };

    await fetch(HOST_DOMAIN + "/login-mail", postParameter)
    .then((result) => {
      if (result.status !== 401) {
        if (result.code == "auth/wrong-password") {
          // 当初メールアドレスで登録していたが、Googleアカウントで再ログインした場合のエラー表示
          setError("メールアドレスかログイン方法に誤りがあります。");
          return;
        } else if (result.code == "auth/user-not-found") {
          setError("メールアドレスが登録されていません。");
          return;
        };
        setSignInCheck(true);
        setUser(result.user);

        const email = emailRef.current.value;

        const postParameter = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email
          })
        };

        fetch(HOST_DOMAIN + "/login-first", postParameter)
        .then((result) => {
          if (result.status === 200) {
            navigate("/accountsetup");
          } else {
            navigate("/");
          };
        });
      } else {
        setError("メールアドレス認証を完了してください。");
      };
    })
    .catch((error) => {
      switch (error.code) {
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
      };
    });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const provider = result.providerId;
        const email = result.user.email;
        const uuid = result.user.uid;
        const createdAt = result.user.metadata.createdAt;

        const postParameter = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            provider,
            email,
            uuid,
            createdAt
          })
        };

        fetch(HOST_DOMAIN + "/login-google", postParameter);
        setSignInCheck(true);
        setUser(result.user);
        const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
        if (isNewUser) {
          navigate("/accountsetup");
        } else {
          navigate("/");
        };
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
        <button>ログイン</button>
      </form>
      <div>----------------------</div>
      <div onClick={handleGoogleSignIn}>
        <GoogleAuthButton>Googleアカウントでログイン</GoogleAuthButton>
      </div>
      <div>
        ユーザ登録は<Link to="/signup">こちら</Link>から
      </div>
      <div>
        パスワードを忘れた方は<Link to="/pwreset">こちら</Link>をクリック
      </div>
      <div>
        メールアドレスの認証が必要な方は<Link to="/remailauth">こちら</Link>をクリック
      </div>
    </div>
  );
};


export default Login;