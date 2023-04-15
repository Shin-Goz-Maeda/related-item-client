import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../common/firebase/firebase";
import styled from "styled-components";
import { sp } from "../../../common/context/ResponsiveMedia";
import { AuthContext } from "../../../common/context/AuthContext";
import { HOST_DOMAIN } from "../../../common/constant/Constant";
import { WithdrawalButton } from "../../components/atoms/Button";
import { PageTitleH1 } from "../../components/atoms/PageTitle";
import Header from "../../components/blocks/header/Header";


function WithdrawalConfirmation() {
  const { user, postServer, userLoggedInState } = useContext(AuthContext);
  const navigate = useNavigate();

  // 退会処理
  const handleWithdrawal = () => {
    const email = user.email;

    // POST情報を送信
    fetch(HOST_DOMAIN + "/withdrawal", postServer(email))
      .then(() => {
        userLoggedInState(false, "");
        signOut(auth);
        navigate("/withdrawalcomplete");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Header />
      <WithdrawalContainerDiv>
        <PageTitleH1>退会</PageTitleH1>
        <WithdrawalInfoDiv>
          <PageInfoP>退会する場合は下記のボタンをクリックしてください。</PageInfoP>
          <WithdrawalButton onClick={handleWithdrawal}>退会</WithdrawalButton>
        </WithdrawalInfoDiv>
      </WithdrawalContainerDiv>
    </>
  );
};


const WithdrawalContainerDiv = styled.div`
  width: 100%;
  padding: 100px 0px 30px 0px;
`;

const WithdrawalInfoDiv = styled.div``;

const PageInfoP = styled.p`
  margin-bottom: 15px;
  text-align: center;

  ${sp`
    padding: 0 50px;
  `}
`;


export default WithdrawalConfirmation;