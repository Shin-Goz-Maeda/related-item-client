import { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../common/context/AuthContext";
import { HOST_DOMAIN } from "../../../common/constant/Constant";
import Header from "../../components/blocks/header/Header";
import { AccountInfoInputButton } from "../../components/atoms/Button";
import { PageTitleH1 } from "../../components/atoms/PageTitle";
import { BaseForm, AccountSetUpLabel, AccountSetUpInput, BaseCheckInput, CircleInput } from "../../components/atoms/Form";


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
      <FormContainerDiv>
        <FormContainerInnerDiv>
          <BaseForm onSubmit={handleSubmit}>
            <PageTitleH1>アカウント情報登録</PageTitleH1>
            <UserNameDiv>
              <AccountSetUpLabel htmlFor="userName">ユーザ名</AccountSetUpLabel>
              <AccountSetUpInput
                type="text"
                placeholder="username"
                required="required"
                ref={userNameRef}
              />
            </UserNameDiv>
            <SexDiv>
              <AccountSetUpLabel htmlFor="sex">性別</AccountSetUpLabel>
              <SexLabel>男</SexLabel>
              <CircleInput
                name="sex"
                type="radio"
                value="male"
                required="required"
                onChange={onChangeSexValue}
              />
              <SexLabel>女</SexLabel>
              <CircleInput
                name="sex"
                type="radio"
                required="required"
                value="female"
                onChange={onChangeSexValue}
              />
            </SexDiv>
            <BirthDayDiv>
              <AccountSetUpLabel htmlFor="birthDay">誕生日</AccountSetUpLabel>
              <AccountSetUpInput
                type="date"
                required="required"
                ref={birthDayRef}
              />
            </BirthDayDiv>
            <CategoriesDiv>
              <AccountSetUpLabel htmlFor="recommendItem">気になるカテゴリー</AccountSetUpLabel>
                <CategoryDiv>
                  <BaseCheckInput
                    type="checkbox"
                    value="fashion"
                    onChange={handleSelectItem}
                    checked={recommendItem.includes("fashion")}
                  />
                  <CategoryNameLabel>ファッション</CategoryNameLabel>
                </CategoryDiv>
                <CategoryDiv>
                  <BaseCheckInput
                    type="checkbox"
                    value="food-drink"
                    onChange={handleSelectItem}
                    checked={recommendItem.includes("food-drink")}
                  />
                  <CategoryNameLabel>グルメ・飲料</CategoryNameLabel>
                </CategoryDiv>
                <CategoryDiv>
                  <BaseCheckInput
                    type="checkbox"
                    value="dailyNecessities-healthCare"
                    onChange={handleSelectItem}
                    checked={recommendItem.includes("dailyNecessities-healthCare")}
                  />
                  <CategoryNameLabel>日用品・ヘルスケア</CategoryNameLabel>
                </CategoryDiv>
                <CategoryDiv>
                  <BaseCheckInput
                    type="checkbox"
                    value="cosmetics-hairCare"
                    onChange={handleSelectItem}
                    checked={recommendItem.includes("cosmetics-hairCare")}
                  />
                  <CategoryNameLabel>コスメ・ヘアケア</CategoryNameLabel>
                </CategoryDiv>
                <CategoryDiv>
                  <BaseCheckInput
                    type="checkbox"
                    value="baby-kids"
                    onChange={handleSelectItem}
                    checked={recommendItem.includes("baby-kids")}
                  />
                  <CategoryNameLabel>ベビー・キッズ</CategoryNameLabel>
                </CategoryDiv>
                <CategoryDiv>
                  <BaseCheckInput
                    type="checkbox"
                    value="electronics"
                    onChange={handleSelectItem}
                    checked={recommendItem.includes("electronics")}
                  />
                  <CategoryNameLabel>家電</CategoryNameLabel>
                </CategoryDiv>
                <CategoryDiv>
                  <BaseCheckInput
                    type="checkbox"
                    value="sports-outdoor"
                    onChange={handleSelectItem}
                    checked={recommendItem.includes("sports-outdoor")}
                  />
                  <CategoryNameLabel>スポーツ・アウトドア</CategoryNameLabel>
                </CategoryDiv>
            </CategoriesDiv>
            <AccountInfoInputButton type="submit" value="登録してホーム画面へ" />
          </BaseForm>
        </FormContainerInnerDiv>
      </FormContainerDiv>
    </>
  );
};


const FormContainerDiv = styled.div`
  width: 100%;
  padding: 120px 0px 30px 0px;
`;

const FormContainerInnerDiv = styled.div`
  width: 100%;
  padding-top: 20px;
`;

const UserNameDiv = styled.div`
  margin-bottom: 20px;
`;

const SexDiv = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const SexLabel = styled.label`
  margin-bottom: 5px;
  margin-left: 20px;
`;

const BirthDayDiv = styled.div`
  margin-bottom: 20px;
`;

const CategoriesDiv = styled.div`
  display: table;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const CategoryDiv = styled.div`
  margin-bottom: 2px;
`;

const CategoryNameLabel = styled.label`
  margin-left: 15px;
`;


export default AccountSetUp;