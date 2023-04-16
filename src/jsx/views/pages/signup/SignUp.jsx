import { useRef, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../common/context/AuthContext";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { auth, googleProvider } from "../../../common/firebase/firebase";
import { HOST_DOMAIN } from "../../../common/constant/Constant";
import { GoogleAuthButton, RegisterButton } from "../../components/atoms/Button";
import LogoImg from "../../../../img/Logo.jpeg";
import { BaseLogoImg } from "../../components/atoms/Logo";
import { BaseForm, BaseFormHeaderDiv, BaseLabel, BaseInput, BaseLineDiv } from "../../components/atoms/Form";
import { PageTitleH1 } from "../../components/atoms/PageTitle";
import { sp } from "../../../common/context/ResponsiveMedia";


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
        if (result.error === "form_is_empty") {
          // フォームが空の場合に表示
          setError("アドレスとパスワードを入力してください。");
        } else if (result.error === "already_register") {
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
      .catch((error) => {
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

        userLoggedInState(true, result.user);

        // 初回ログインユーザー
        const isNewUser = getAdditionalUserInfo(result)?.isNewUser;

        // POST情報を送信
        fetch(HOST_DOMAIN + "/signup-google", postServer(email, "", uuid, provider))
          .then((response) => {
            response.json()
            .then((result) => {
              if(result.user_delete === 1) {
                navigate("/accountsetup");
                return;
              };
            });
          });

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
    <RegisterContainerDiv>
      <RegisterContainerInnerDiv>
        <BaseFormHeaderDiv>
          <BaseLogoImg src={LogoImg} />
          <PageTitleH1>アカウント登録</PageTitleH1>
        </BaseFormHeaderDiv>
        <BaseForm onSubmit={handleSubmit}>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          <EmailDiv>
            <BaseLabel htmlFor="email">メールアドレス</BaseLabel>
            <BaseInput
              type="email"
              placeholder="xxx@email.com"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$\S|\S.*?\S"
              ref={emailRef}
            />
          </EmailDiv>
          <PasswordDiv>
            <BaseLabel htmlFor="password">パスワード</BaseLabel>
            <BaseInput
              type="password"
              placeholder="Password123"
              maxlength="20"
              pattern="^([a-zA-Z0-9]{6,})$\S|\S.*?\S"
              ref={passwordRef}
            />
          </PasswordDiv>
          <RegisterButton>登録</RegisterButton>
        </BaseForm>
        <BaseLineDiv>または</BaseLineDiv>
          <GoogleAuthDiv onClick={handleGoogleSignUp}>
            <GoogleAuthButton>Googleアカウントで登録</GoogleAuthButton>
          </GoogleAuthDiv>
        <LoginDiv>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#333333",
              fontWeight: "bold"
            }}
          >ログインはこちら
          </Link>
        </LoginDiv>
      </RegisterContainerInnerDiv>
    </RegisterContainerDiv>
  );
};


const RegisterContainerDiv = styled.div`
  width: 100%;
  padding-top: 50px;
`;

const RegisterContainerInnerDiv = styled.div`
  width: 520px;
  padding: 40px 10px;
  margin: 0 auto;
  border: solid 1px #333333;
  border-radius: 50px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);

  ${sp`
    width: 80%;
  `}
`;

const EmailDiv = styled.div`
  margin-bottom: 10px;
`;

const PasswordDiv = styled.div`
  margin-bottom: 10px;
`;

const GoogleAuthDiv = styled.div`
  margin-bottom: 10px;
`;

const LoginDiv = styled.div`
  text-align: center;
`;


export default SignUp;