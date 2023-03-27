import { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../common/context/AuthContext";
import { HOST_DOMAIN } from "../../../common/constant/constants";
import Header from "../../components/blocks/header/Header";


// ユーザー情報設定
function AccountSetUp() {
  const { user } = useContext(AuthContext);
  const [ selectedSex, setSelectedSex ] = useState();
  const [ recommendItem, setRecommendItem ] = useState([]);
  const userNameRef = useRef(null);
  const birthDayRef = useRef(null);
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
    // DBでは、レコメンドジャンルを配列で保存するために変換
    const recommendItemJson = JSON.stringify(recommendItem);

    // POST情報を設定
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

    // DBにPOST情報を送信
    fetch(HOST_DOMAIN + "/user-info", postParameter)
      .then((result) => {
        if (result.status === 200) {
          navigate("/");
        };
      });
  };

  return (
    <>
      <Header />
      <FormContainer>
        <PageTitle>アカウント情報登録</PageTitle>
        <AccountInfoForm onSubmit={handleSubmit}>
          <UserNameDiv>
            <InfoLabel htmlFor="userName">ユーザ名</InfoLabel>
            <Input
              type="text"
              placeholder="username"
              required="required"
              ref={userNameRef}
            />
          </UserNameDiv>
          <SexDiv>
            <InfoLabel htmlFor="sex">性別</InfoLabel>
            <Input
              type="radio"
              value="male"
              required="required"
              onChange={onChangeSexValue}
            />男
            <Input
              type="radio"
              required="required"
              value="female"
              onChange={onChangeSexValue}
            />女
          </SexDiv>
          <BirthDayDiv>
            <InfoLabel htmlFor="birthDay">誕生日</InfoLabel>
            <Input
              type="date"
              required="required"
              ref={birthDayRef}
            />
          </BirthDayDiv>
          <CategoryDiv>
            <InfoLabel htmlFor="recommendItem">気になるカテゴリー</InfoLabel>
            <Input
              type="checkbox"
              value="fashion"
              onChange={handleSelectItem}
              checked={recommendItem.includes("fashion")}
            />ファッション
            <Input
              type="checkbox"
              value="food-drink"
              onChange={handleSelectItem}
              checked={recommendItem.includes("food-drink")}
            />グルメ・飲料
            <Input
              type="checkbox"
              value="dailyNecessities-healthCare"
              onChange={handleSelectItem}
              checked={recommendItem.includes("dailyNecessities-healthCare")}
            />日用品・ヘルスケア
            <Input
              type="checkbox"
              value="cosmetics-hairCare"
              onChange={handleSelectItem}
              checked={recommendItem.includes("cosmetics-hairCare")}
            />コスメ・ヘアケア
            <Input
              type="checkbox"
              value="baby-kids"
              onChange={handleSelectItem}
              checked={recommendItem.includes("baby-kids")}
            />ベビー・キッズ
            <Input
              type="checkbox"
              value="electronics"
              onChange={handleSelectItem}
              checked={recommendItem.includes("electronics")}
            />家電
            <Input
              type="checkbox"
              value="sports-outdoor"
              onChange={handleSelectItem}
              checked={recommendItem.includes("sports-outdoor")}
            />スポーツ・アウトドア
          </CategoryDiv>
          <Input type="submit" value="登録してホーム画面へ"/>
        </AccountInfoForm>
      </FormContainer>
    </>
  );
};


const FormContainer = styled.div``;

const PageTitle = styled.h1``;

const InfoLabel = styled.label``;

const UserNameDiv = styled.div``;

const SexDiv = styled.div``;

const BirthDayDiv = styled.div``;

const CategoryDiv = styled.div``;

const AccountInfoForm = styled.form``;

const Input = styled.input``;


export default AccountSetUp;