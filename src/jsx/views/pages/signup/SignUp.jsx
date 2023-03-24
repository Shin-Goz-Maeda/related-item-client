import { useRef, useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../common/context/AuthContext";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { auth, googleProvider } from "../../../common/firebase/firebase";
import { HOST_DOMAIN } from "../../../common/constant/constants";
import { GoogleAuthButton } from "../../components/atoms/Button";


function SignUp() {
  const { setUser, setSignInCheck } = useContext(AuthContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [ error, setError ] = useState("");

  // サブミット時の処理
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const createdAt = Date.now();
    const updatedAt = Date.now();

    const postParameter = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        createdAt,
        updatedAt
      })
    };

    await fetch(HOST_DOMAIN + "/signup-mail", postParameter)
      .then((response) => response.json())
      .then((result) => {
        if (result === 1) {
          setError("このメールアドレスは使用できません。");
        } else if (result === 2) {
          setError("このアドレスは登録されています。");
        } else {
          if (result.user) {
            setSignInCheck(true);
            setUser(result.user);
            navigate("/mailauth");
          };
        };
      })
      // TODO:エラーコードをloginページと共通化する。
      .catch((error)  => {
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
        };
      });
  };

  const handleGoogleSignUp = () => {
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

        fetch(HOST_DOMAIN + "/signup-google", postParameter);
        setSignInCheck(true);
        setUser(result.user);
        const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
        if (isNewUser) {
          navigate("/accountsetup");
          return;
        } else {
          navigate("/");
          return;
        };
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <h1>アカウント登録</h1>
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
        <button>登録</button>
      </form>
      <div>----------------------</div>
      <div onClick={handleGoogleSignUp}>
        <GoogleAuthButton>Googleアカウントで登録</GoogleAuthButton>
      </div>
      <div>
        ログインは<Link to="/login">こちら</Link>から
      </div>
      <div>
        メールアドレスの認証が必要な方は<Link to="/remailauth">こちら</Link>をクリック
      </div>
    </div>
  );
};


export default SignUp;