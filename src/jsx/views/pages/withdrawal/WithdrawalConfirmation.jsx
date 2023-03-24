import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../common/context/AuthContext";
import { HOST_DOMAIN } from "../../../common/constant/constants";
import Header from "../../components/blocks/header/Header";


function WithdrawalConfirmation() {
  const navigate = useNavigate();
  const { user, setUser, setSignInCheck } = useContext(AuthContext);

  const handleWithdrawal = () => {
    const email = user.email;

    const postParameter = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email
      })
    };

    fetch(HOST_DOMAIN + "/withdrawal", postParameter)
      .then(() => {
        setUser("");
        setSignInCheck(false);
        navigate("/withdrawalcomplete");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
    <Header />
    <div>
      <h2>退会</h2>
      <div>
        <p>退会する場合は下記のボタンをクリックしてください。</p>
        <button onClick={handleWithdrawal}>退会</button>
      </div>
    </div>
    </>
  );
};


export default WithdrawalConfirmation;