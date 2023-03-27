import { useRef, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../common/context/AuthContext";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { auth, googleProvider } from "../../../common/firebase/firebase";
import { HOST_DOMAIN } from "../../../common/constant/constants";
import { GoogleAuthButton } from "../../components/atoms/Button";


function Login() {
  const { postServer, catchError, userLoggedInState } = useContext(AuthContext);
  const [ error, setError ] = useState();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  // メールアドレス認証を使ったログイン
  const handleMailLogIn = async (event) => {
    event.preventDefault();
    // フォームに入力した内容を取得
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // POST情報を送信
    await fetch(HOST_DOMAIN + "/login-mail", postServer(email, password))
    .then((response) => response.json())
    .then((result) => {
      // メール認証が完了しているかを判定
      if (result.user.emailVerified) {
        // メール認証が完了している場
        userLoggedInState(true, result.user);

        // POST情報を送信
        fetch(HOST_DOMAIN + "/login-first", postServer(email))
        .then((result) => {
          // 初回ログインかを判定
          if (result.status === 200) {
            // 初回ログイン場合
            navigate("/accountsetup");
          } else {
            // 2回目以降のログインの場合
            navigate("/");
          };
        });
      } else {
        // メール認証が完了していない場合
        setError("メールアドレス認証を完了してください。");
      };
    })
    // POST情報を送信してエラーが発生した場合
    .catch((error) => {
      setError(catchError(error));
    });
  };

  // Google認証を使ったログイン
  const handleGoogleLogIn = () => {
    // firebase ログインメソッド
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const email = result.user.email;
        const uuid = result.user.uid;
        const provider = result.providerId;

        // POST情報を送信
        fetch(HOST_DOMAIN + "/login-google", postServer(email, "", uuid, provider));
        userLoggedInState(true, result.user);

        // 初回ログインユーザー
        const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
        // 初回ログインユーザーかを判定
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
    <LoginContainer>
      <PageTitle>ログイン</PageTitle>
      <LoginForm onSubmit={handleMailLogIn}>
      {error && <p style={{ color: "red" }}>{error}</p>}
        <EmailDiv>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            placeholder="email"
            ref={emailRef}
          />
        </EmailDiv>
        <PasswordDiv>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            placeholder="password"
            ref={passwordRef}
          />
        </PasswordDiv>
        <SubmitButton>ログイン</SubmitButton>
      </LoginForm>
      <Line>----------------------</Line>
      <GoogleAuthDiv onClick={handleGoogleLogIn}>
        <GoogleAuthButton>Googleアカウントでログイン</GoogleAuthButton>
      </GoogleAuthDiv>
      <AccountRegisterDiv>
        ユーザ登録は<Link to="/signup">こちら</Link>から
      </AccountRegisterDiv>
      <PasswordResetDiv>
        パスワードを忘れた方は<Link to="/pwreset">こちら</Link>をクリック
      </PasswordResetDiv>
    </LoginContainer>
  );
};


const LoginContainer = styled.div``;

const PageTitle = styled.h1``;

const LoginForm = styled.form``;

const EmailDiv = styled.div``;

const PasswordDiv = styled.div``;

const Line = styled.div``;

const SubmitButton = styled.button``;

const GoogleAuthDiv = styled.div``;

const AccountRegisterDiv = styled.div``;

const PasswordResetDiv = styled.div``;


export default Login;