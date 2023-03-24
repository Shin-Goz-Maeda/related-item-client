import { Link } from "react-router-dom";


function WithdrawalComplete() {
  return (
    <div>
      <h3>
        退会が完了しました。
      </h3>
      <div>
        ユーザ再登録は<Link to="/signup">こちら</Link>から
      </div>
    </div>
  );
};


export default WithdrawalComplete;