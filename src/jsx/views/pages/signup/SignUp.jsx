import { useRef, useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../common/context/AuthContext";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { auth, googleProvider } from "../../../common/firebase/firebase";
import { HOST_DOMAIN } from "../../../common/constant/constants";
import { GoogleAuthButton } from "../../components/atoms/Button";


function SignUp() {
  const { postServer, catchError, userLoggedInState } = useContext(AuthContext);
  const [ error, setError ] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  // メールアドレス認証を使用したサインアップ処理
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // POST情報を送信
    await fetch(HOST_DOMAIN + "/signup-mail", postServer(email, password))
      .then((response) => response.json())
      .then((result) => {
        if (result === 1) {
          // Google認証を使って登録しているユーザーor既にメール認証で登録済のユーザーに対してブラウザにエラーを表示（すでに登録しているユーザーの場合は2を受け取る）。
          setError("このアドレスは登録されています。");
        } else if (result.user.emailVerified) {
          // 一度退会していてメール認証が完了しているユーザーは、アカウントセットアップページへ移動。
          if (result.user) {
            userLoggedInState(true, result.user);
            navigate("/accountsetup");
          };
        } else {
          if (result.user) {
            // 初回登録のユーザーはメール認証を案内。
            userLoggedInState(true, result.user);
            navigate("/mailauth");
          };
        };
      })
      .catch((error)  => {
        setError(catchError(error));
      });
  };

  // Google認証を使用したサインアップ処理
  const handleGoogleSignUp = () => {
    // firebaseのサインインメソッド
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const email = result.user.email;
        const uuid = result.user.uid;
        const provider = result.providerId;

        // POST情報を送信
        fetch(HOST_DOMAIN + "/signup-google", postServer(email, "",uuid, provider));
        userLoggedInState(true, result.user);

        // 初回ログインユーザー
        const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
        // 初回ログインユーザーかを判定
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
    <RegisterContainer>
      <PageTitle>アカウント登録</PageTitle>
      <RegisterForm onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
        <EmailDiv>
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            type="email"
            placeholder="email"
            ref={emailRef}
          />
        </EmailDiv>
        <PasswordDiv>
          <Label htmlFor="password">パスワード</Label>
          <Input
            type="password"
            placeholder="password"
            ref={passwordRef}
          />
        </PasswordDiv>
        <SubmitButton>登録</SubmitButton>
      </RegisterForm>
      <Line>----------------------</Line>
      <GoogleAuthDiv onClick={handleGoogleSignUp}>
        <GoogleAuthButton>Googleアカウントで登録</GoogleAuthButton>
      </GoogleAuthDiv>
      <LoginDiv>
        ログインは<Link to="/login">こちら</Link>から
      </LoginDiv>
    </RegisterContainer>
  );
};


const RegisterContainer = styled.div``;

const PageTitle = styled.h1``;

const Label = styled.label``;

const RegisterForm = styled.form``;

const EmailDiv = styled.div``;

const PasswordDiv = styled.div``;

const SubmitButton = styled.button``;

const Line = styled.div``;

const GoogleAuthDiv = styled.div``;

const LoginDiv = styled.div``;

const Input = styled.input``;


export default SignUp;