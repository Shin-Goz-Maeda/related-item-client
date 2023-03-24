import { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../common/context/AuthContext";
import { HOST_DOMAIN } from "../../../common/constant/constants";
import Header from "../../components/blocks/header/Header";


function AccountSetUp() {
  const [ selectedSex, setSelectedSex ] = useState();
  const [ recommendItem, setRecommendItem ] = useState([]);
  const recommendItemJson = JSON.stringify(recommendItem);
  const userNameRef = useRef(null);
  const birthDayRef = useRef(null);

  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();

  const onChangeSexValue = (e) => {
    setSelectedSex(e.target.value);
  };

  const handleSelectItem = (e) => {
    if (recommendItem.includes(e.target.value)) {
      setRecommendItem(recommendItem.filter(item => item !== e.target.value));
    } else {
      setRecommendItem([...recommendItem, e.target.value]);
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = user.email;
    const userName = userNameRef.current.value;
    const birthDay = birthDayRef.current.value;

    const postParameter = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        userName,
        birthDay,
        selectedSex,
        recommendItemJson
      })
    };

    fetch(HOST_DOMAIN + "/user-info", postParameter)
      .then((result) => {
        if (result.status === 200) {
          navigate("/");
        } else {
          console.log("予期しないエラーが発生しました。");
        };
      });
  };

  return (
    <>
      <Header />
      <div>
      <h1>アカウント情報登録</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">ユーザ名</label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="username"
              required="required"
              ref={userNameRef}
            />
          </div>
          <div>
            <label htmlFor="sex">性別</label>
            <input
              type="radio"
              id="male"
              name="sex"
              value="male"
              required="required"
              onChange={onChangeSexValue}
            />男
            <input
              type="radio"
              id="female"
              name="sex"
              required="required"
              value="female"
              onChange={onChangeSexValue}
            />女
          </div>
          <div>
            <label htmlFor="birthDay">誕生日</label>
            <input
              type="date"
              id="birthDay"
              name="birthDay"
              required="required"
              ref={birthDayRef}
            />
          </div>
          <div>
            <label htmlFor="recommendItem">気になるカテゴリー</label>
            <input
              type="checkbox"
              className="recommendItem"
              name="recommendItem"
              value="fashion"
              onChange={handleSelectItem}
              checked={recommendItem.includes("fashion")}
            />ファッション
            <input
              type="checkbox"
              className="recommendItem"
              name="recommendItem"
              value="food-drink"
              onChange={handleSelectItem}
              checked={recommendItem.includes("food-drink")}
            />グルメ・飲料
            <input
              type="checkbox"
              className="recommendItem"
              name="recommendItem"
              value="dailyNecessities-healthCare"
              onChange={handleSelectItem}
              checked={recommendItem.includes("dailyNecessities-healthCare")}
            />日用品・ヘルスケア
            <input
              type="checkbox"
              className="recommendItem"
              name="recommendItem"
              value="cosmetics-hairCare"
              onChange={handleSelectItem}
              checked={recommendItem.includes("cosmetics-hairCare")}
            />コスメ・ヘアケア
            <input
              type="checkbox"
              className="recommendItem"
              name="recommendItem"
              value="baby-kids"
              onChange={handleSelectItem}
              checked={recommendItem.includes("baby-kids")}
            />ベビー・キッズ
            <input
              type="checkbox"
              className="recommendItem"
              name="recommendItem"
              value="electronics"
              onChange={handleSelectItem}
              checked={recommendItem.includes("electronics")}
            />家電
            <input
              type="checkbox"
              className="recommendItem"
              name="recommendItem"
              value="sports-outdoor"
              onChange={handleSelectItem}
              checked={recommendItem.includes("sports-outdoor")}
            />スポーツ・アウトドア
          </div>
          <input type="submit" value="登録してホーム画面へ"/>
        </form>
      </div>
    </>
  );
};


export default AccountSetUp;