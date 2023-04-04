import styled from "styled-components";


// アカウント登録後に認証メールを送信したことを案内。
function MailAuth() {
  return (
    <MessageContainer>
      <P>登録頂いたメールアドレスへ認証メールを送信しました。</P>
      <P>メールに記載のリンクをクリックしてメール認証を行ってください。</P>
    </MessageContainer>
  );
};


const MessageContainer = styled.div``;

const P = styled.p``;

export default MailAuth;