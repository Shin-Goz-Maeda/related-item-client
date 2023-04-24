import { useState, useRef, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../common/context/AuthContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../common/firebase/firebase";
import Header from "../../components/blocks/header/Header";
import { PwResetButton } from "../../components/atoms/Button";
import { BaseForm, BaseLabel, PwResetInput, BaseLineDiv } from "../../components/atoms/Form";
import { PageTitleH1 } from "../../components/atoms/PageTitle";
import { sp } from "../../../common/context/ResponsiveMedia";
import { HOST_DOMAIN } from "../../../common/constant/Constant";


function PwReset() {
  const { user, actionSetting, catchError, postServer } = useContext(AuthContext);
  const [ error, setError ] = useState();
  const [ success, setSuccess ] = useState();
  const [ loading, setLoading ] = useState(false);
  const [ provider ,setProvider ] = useState("");
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
      })
  };

  // ログイン画面のパスワードリセット処理
  const handleChangePassword = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;

    fetch(HOST_DOMAIN + "/mail-check", postServer(email))
      .then((response) => {
        response.json()
        .then((result) => {
          if (!result[0]) {
            setError("入力したアドレスは登録されていません。");
          } else {
            // firebaseのパスワード再設定メソッド
            sendPasswordResetEmail(auth, email, actionSetting("/login"))
            .then(() => {
              setSuccess("パスワード再設定メールを送信しました。");
              setTimeout(() => {
                navigate("/login");
              }, 5000);
            })
            .catch((error) => {
              setError(catchError(error.message));
            });
          };
        });
      });
  };

  const whatProvider = () => {
    if (provider === "google.com") {
      return (
        <>
          <Header />
          <LoggedPwResetContainerDiv>
            <PageTitleH1>パスワードリセット</PageTitleH1>
            <PageInfoP>ご登録のログイン方法では、<br/>パスワードリセットはできません。
            </PageInfoP>
          </LoggedPwResetContainerDiv>
        </>
      );
    } else {
      return (
        <>
          <Header />
          <LoggedPwResetContainerDiv>
            <PageTitleH1>パスワードリセット</PageTitleH1>
            <PageInfoP>パスワードのリセットは下記ボタンをクリック後、<br/>ご登録のメールへ再設定メールが送信されます。
            </PageInfoP>
            <BaseForm onSubmit={handleChangePasswordLogged}>
              {success && <p style={{ color: "blue", textAlign: "center", marginBottom: 3 }}>{success}</p>}
              {error && <p style={{ color: "red", textAlign: "center", marginBottom: 3 }}>{error}</p>}
              <PwResetButton>再設定メールを送信</PwResetButton>
            </BaseForm>
          </LoggedPwResetContainerDiv>
        </>
      );
    };
  };

  useEffect(() => {
    setLoading(false);
    if (user) {
      const email = user.email;
      // DBからアカウントのログイン方法を取得
      fetch(HOST_DOMAIN + "/login-provider", postServer(email))
        .then((response) => {
          response.json()
          .then((result) => {
            setProvider(result[0].provider);
          });
        })
    };
    setLoading(true);
  }, [postServer, user]);

  // ログイン状態を判定して画面表示を切り替え
  return (
    <>
      {loading ?
        <>
          {user ?
            whatProvider() :
            <PwResetContainerDiv>
              <PwResetContainerInnerDiv>
                <PageTitleH1>パスワードリセット</PageTitleH1>
                <BaseForm onSubmit={handleChangePassword}>
                  {success && <p style={{ color: "blue", textAlign: "center", marginBottom: 3 }}>{success}</p>}
                  {error && <p style={{ color: "red", textAlign: "center", marginBottom: 3 }}>{error}</p>}
                  <PwResetFormDiv>
                    <BaseLabel htmlFor="email">メールアドレス</BaseLabel>
                    <PwResetInput
                      type="email"
                      placeholder="xxx@email.com"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$\S|\S.*?\S"
                      ref={emailRef}
                    />
                  </PwResetFormDiv>
                  <PwResetButton>再設定メールを送信</PwResetButton>
                </BaseForm>
                <BaseLineDiv>または</BaseLineDiv>
                <LoginDiv>
                  <Link
                    to="/login"
                    style={{
                      color: "#333333",
                      fontWeight: "bold"
                    }}
                  >ログインはこちら
                  </Link>
                </LoginDiv>
              </PwResetContainerInnerDiv>
            </PwResetContainerDiv>
          }
        </> :
        <LoadPageDiv>ロード中</LoadPageDiv>
      }
    </>
  );
};


// ログイン前
const PwResetContainerDiv = styled.div`
  width: 100%;
  padding-top: 50px;
`;

const PwResetContainerInnerDiv = styled.div`
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

const PwResetFormDiv = styled.div``;

const LoginDiv = styled.div`
  text-align: center;
`;

// ログイン後
const LoggedPwResetContainerDiv = styled.div`
  width: 100%;
  padding: 100px 0px 30px 0px;
`;

const PageInfoP = styled.p`
  margin-bottom: 20px;
  text-align: center;

  ${sp`
    padding: 0 50px;
  `}
`;

// 共通
const LoadPageDiv = styled.div`
  width: 100%;
  text-align: center;
`;

export default PwReset;