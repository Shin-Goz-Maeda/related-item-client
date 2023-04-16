import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../common/context/AuthContext";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { auth, googleProvider } from "../../../common/firebase/firebase";
import { HOST_DOMAIN } from "../../../common/constant/Constant";
import { GoogleAuthButton, LoginButton } from "../../components/atoms/Button";
import LogoImg from "../../../../img/Logo.jpeg";
import { BaseForm, BaseFormHeaderDiv, BaseLabel, BaseInput, BaseLineDiv } from "../../components/atoms/Form";
import { BaseLogoImg } from "../../components/atoms/Logo";
import { PageTitleH1 } from "../../components/atoms/PageTitle";
import { sp } from "../../../common/context/ResponsiveMedia";


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
      if (result.code === "auth/wrong-password") {
        setError("認証方法に問題があります。");
      } else if (result.error !== "not_mailVerified") {
        // メール認証が完了している場
        userLoggedInState(true, result.user);

        // POST情報を送信
        fetch(HOST_DOMAIN + "/first-login", postServer(email))
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
    <LoginContainerDiv>
      <LoginContainerInnerDiv>
        <BaseFormHeaderDiv>
          <BaseLogoImg src={LogoImg} />
          <PageTitleH1>ログイン</PageTitleH1>
        </BaseFormHeaderDiv>
        <BaseForm onSubmit={handleMailLogIn}>
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
          <PasswordResetDiv>
            <Link
              to="/pwreset"
              style={{
                textDecoration: "none",
                color: "#333333",
                fontWeight: "bold"
              }}
            >パスワードを忘れた方場合
            </Link>
          </PasswordResetDiv>
          <LoginButton>ログイン</LoginButton>
        </BaseForm>
        <BaseLineDiv>または</BaseLineDiv>
        <GoogleAuthDiv onClick={handleGoogleLogIn}>
          <GoogleAuthButton>Googleアカウントでログイン</GoogleAuthButton>
        </GoogleAuthDiv>
        <AccountRegisterDiv>
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "#333333",
              fontWeight: "bold"
            }}
          >ユーザ登録はこちら
          </Link>
        </AccountRegisterDiv>
      </LoginContainerInnerDiv>
    </LoginContainerDiv>
  );
};


const LoginContainerDiv = styled.div`
  width: 100%;
  padding-top: 50px;

  ${sp`
    padding-top: 25px;
  `}
`;

const LoginContainerInnerDiv = styled.div`
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

const PasswordResetDiv = styled.div`
  margin-bottom: 10px;
  text-align: center;
`;

const GoogleAuthDiv = styled.div`
  margin-bottom: 10px;
`;

const AccountRegisterDiv = styled.div`
  text-align: center;
`;


export default Login;