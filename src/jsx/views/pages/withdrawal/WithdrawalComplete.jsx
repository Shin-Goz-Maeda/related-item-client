import { Link } from "react-router-dom";
import styled from "styled-components";
import { PageTitleH1 } from "../../components/atoms/PageTitle";


// 退会処理が完了したことを案内。
function WithdrawalComplete() {
  return (
    <WithdrawalContainerDiv>
      <PageTitleH1>
        退会が完了しました。
      </PageTitleH1>
      <RegisterDiv>
        <Link
          to="/signup"
          style={{
            color: "#333333",
            fontWeight: "bold"
          }}
        >ユーザ登録はこちら
        </Link>
      </RegisterDiv>
    </WithdrawalContainerDiv>
  );
};


const WithdrawalContainerDiv = styled.div`
  width: 100%;
  padding-top: 50px;
`;

const RegisterDiv = styled.div`
  text-align: center;
`;


export default WithdrawalComplete;