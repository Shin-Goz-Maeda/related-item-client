import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../common/context/AuthContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../common/firebase/firebase";
import Header from "../../components/blocks/header/Header";


function PwReset() {
  const { user, actionSetting } = useContext(AuthContext);
  const [ setError ] = useState();
  const [ success, setSuccess ] = useState();
  const emailRef = useRef(null);
  const navigate = useNavigate();

  // ログイン後のパスワードリセット処理
  const handleChangePasswordLogged = async (event) => {
    event.preventDefault();
    const email = user.email;

    // firebaseのパスワード再設定メソッド
    sendPasswordResetEmail(auth, email, actionSetting("/"))
      .then(() => {
        setSuccess("パスワード再設定メールを送信しました。");
        setTimeout(() => {
          navigate("/");
        }, 5000);
      });
  };

  // ログイン画面のパスワードリセット処理
  const handleChangePassword = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;

    // firebaseのパスワード再設定メソッド
    sendPasswordResetEmail(auth, email, actionSetting("/login"))
      .then(() => {
        setSuccess("パスワード再設定メールを送信しました。");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      })
      .catch((err) => {
        console.log(err.message);
        setError("メールアドレスを確認してください。");
      });
  };

  // ログイン状態を判定して画面表示を切り替え
  return (
    <>
      {user ?
        <>
          <Header />
          <PasswordResetContainer>
            <PageTitle>パスワードリセット</PageTitle>
            <ResetForm onSubmit={handleChangePasswordLogged}>
              {success && <p style={{ color: "blue" }}>{success}</p>}
              <SubmitButton>再設定メールを送信</SubmitButton>
            </ResetForm>
          </PasswordResetContainer>
        </> :
        <PasswordResetContainer>
          <PageTitle>パスワードリセット</PageTitle>
          <ResetForm onSubmit={handleChangePassword}>
            {success && <p style={{ color: "blue" }}>{success}</p>}
            <FormDiv>
              <EmailLabel htmlFor="email">メールアドレス</EmailLabel>
              <Input
                type="email"
                placeholder="email"
                ref={emailRef}
              />
            </FormDiv>
            <SubmitButton>再設定メールを送信</SubmitButton>
          </ResetForm>
          <Line>----------------------</Line>
          <LoginDiv>
            ログインは<Link to="/login">こちら</Link>から
          </LoginDiv>
        </PasswordResetContainer>
      }
    </>
  );
};


const PasswordResetContainer = styled.div``;

const PageTitle = styled.h1``;

const ResetForm = styled.form``;

const SubmitButton = styled.button``;

const Line = styled.div``;

const LoginDiv = styled.div``;

const EmailLabel = styled.label``;

const FormDiv = styled.div``;

const Input = styled.input``;


export default PwReset;