import styled from "styled-components";


// アカウント登録後に認証メールを送信したことを案内。
function MailAuth() {
  return (
    <MessageContainerDiv>
      <PageInfoP>登録頂いたメールアドレスへ認証メールを送信しました。</PageInfoP>
      <PageInfoP>メールに記載のリンクをクリックしてメール認証を行ってください。</PageInfoP>
    </MessageContainerDiv>
  );
};


const MessageContainerDiv = styled.div`
  width: 100%;
  padding: 50px 0px 30px 0px;
`;

const PageInfoP = styled.p`
  text-align: center;
`;

export default MailAuth;