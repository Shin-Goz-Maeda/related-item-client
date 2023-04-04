import { Link } from "react-router-dom";
import styled from "styled-components";


// 退会処理が完了したことを案内。
function WithdrawalComplete() {
  return (
    <WithdrawalContainer>
      <WithdrawalP>
        退会が完了しました。
      </WithdrawalP>
      <RegisterDiv>
        ユーザ再登録は<Link to="/signup">こちら</Link>から
      </RegisterDiv>
    </WithdrawalContainer>
  );
};


const WithdrawalContainer = styled.div``;

const WithdrawalP = styled.h3``;

const RegisterDiv = styled.div``;


export default WithdrawalComplete;