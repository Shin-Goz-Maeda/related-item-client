import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../common/context/AuthContext";
import { HOST_DOMAIN } from "../../../common/constant/constants";
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
        navigate("/withdrawalcomplete");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Header />
      <WithdrawalContainer>
        <WithdrawalP>退会</WithdrawalP>
        <WithdrawalInfoDiv>
          <Paragraph>退会する場合は下記のボタンをクリックしてください。</Paragraph>
          <SubmitButton onClick={handleWithdrawal}>退会</SubmitButton>
        </WithdrawalInfoDiv>
      </WithdrawalContainer>
    </>
  );
};


const WithdrawalContainer = styled.div``;

const WithdrawalP = styled.h3``;

const WithdrawalInfoDiv = styled.div``;

const Paragraph = styled.p``;

const SubmitButton = styled.button``;


export default WithdrawalConfirmation;