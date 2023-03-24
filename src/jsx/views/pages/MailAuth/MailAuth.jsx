import { Link } from "react-router-dom";


function MailAuth() {
  return (
    <>
      <div>
        <p>登録頂いたメールアドレスへ認証メールを送信しました。</p>
        <p>メールに記載のリンクをクリックしてメール認証を行ってください。</p>
      </div>
      <div>
        ログインページは<Link to="/login">こちら</Link>から
      </div>
    </>
  );
};


export default MailAuth;