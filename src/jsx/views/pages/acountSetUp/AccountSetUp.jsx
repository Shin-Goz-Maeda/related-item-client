import { useRef, useContext, useState, useEffect } from "react";
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
  const { user, postServer } = useContext(AuthContext);
  const [ userName, setUserName ] = useState("");
  const [ selectedSex, setSelectedSex ] = useState("");
  const [ birthDate, setBirthDate ] = useState("");
  const [ recommendItem, setRecommendItem ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState();
  const userNameRef = useRef(null);
  const birthDayRef = useRef(null);
  const email = user.email;
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
    const userName = userNameRef.current.value;
    const birthDay = birthDayRef.current.value;
    // DBでは、レコメンドジャンルを配列で保存するために変換
    const recommendItemJson = JSON.stringify(recommendItem);

    // POST情報を設定
    const postAccountInfoParameter = {
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
    fetch(HOST_DOMAIN + "/user-info-create", postAccountInfoParameter)
      .then((result) => {
        if (result.status === 200) {
          navigate("/");
        } else if (result.status === 401) {
          setError("誕生日が正しくありません");
        };
      });
  };

  useEffect(()=> {
    setLoading(false);
    // DBから登録済のアカウント情報を取得
    fetch(HOST_DOMAIN + "/get-user-info", postServer(email))
      .then((response) => {
        response.json()
        .then((result) => {
          if (result.length > 0 && result[0].user_name !== null) {
            setUserName(result[0].user_name);
            setSelectedSex(result[0].sex);
            setBirthDate(result[0].birth_date);
            setRecommendItem(result[0].want_to_item);
          };
          setLoading(true);
        });
      });
  }, []);

  const recommendItemCategory = (itemCategory) => {
    const itemLength = recommendItem.length;
    const recommendItemData = recommendItem;
    for (let i = 0; itemLength >= i; i++) {
      if(recommendItemData[i] === itemCategory) {
        return true;
      };
    };
  };

  return (
    <>
      {loading ?
        <>
          <Header />
          <FormContainerDiv>
            <FormContainerInnerDiv>
              <BaseForm autoComplete="off" onSubmit={handleSubmit}>
                <PageTitleH1>アカウント情報登録</PageTitleH1>
                <UserNameDiv>
                  <AccountSetUpLabel htmlFor="userName">ユーザ名（半角英数字）</AccountSetUpLabel>
                  <AccountSetUpInput
                    type="text"
                    placeholder="Username1234"
                    required="required"
                    pattern="^[0-9A-Za-z]+$"
                    defaultValue={userName ? userName : ""}
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
                    defaultChecked={selectedSex === "male"}
                    onClick={onChangeSexValue}
                  />
                  <SexLabel>女</SexLabel>
                  <CircleInput
                    name="sex"
                    type="radio"
                    value="female"
                    required="required"
                    defaultChecked={selectedSex === "female"}
                    onClick={onChangeSexValue}
                  />
                </SexDiv>
                <BirthDayDiv>
                  <AccountSetUpLabel htmlFor="birthDay">誕生日</AccountSetUpLabel>
                  {error && <p style={{ color: "red", textAlign: "center", marginBottom: 3 }}>{error}</p>}
                  <AccountSetUpInput
                    type="date-local"
                    placeholder="1999年04月10日→19990410"
                    required="required"
                    pattern="^[0-9]{8}"
                    defaultValue={birthDate ? birthDate : ""}
                    ref={birthDayRef}
                  />
                </BirthDayDiv>
                <CategoriesDiv>
                  <AccountSetUpLabel htmlFor="recommendItem">気になるカテゴリー</AccountSetUpLabel>
                  <CategoryDiv>
                    <BaseCheckInput
                      type="checkbox"
                      value="fashion"
                      onClick={handleSelectItem}
                      defaultChecked={recommendItem ? recommendItemCategory("fashion") : recommendItem.includes("fashion")}
                    />
                    <CategoryNameLabel>ファッション</CategoryNameLabel>
                  </CategoryDiv>
                  <CategoryDiv>
                    <BaseCheckInput
                      type="checkbox"
                      value="food-drink"
                      onClick={handleSelectItem}
                      defaultChecked={recommendItem ? recommendItemCategory("food-drink") : recommendItem.includes("food-drink")}
                    />
                    <CategoryNameLabel>グルメ・飲料</CategoryNameLabel>
                  </CategoryDiv>
                  <CategoryDiv>
                    <BaseCheckInput
                      type="checkbox"
                      value="dailyNecessities-healthCare"
                      onClick={handleSelectItem}
                      defaultChecked={recommendItem ? recommendItemCategory("dailyNecessities-healthCare") : recommendItem.includes("dailyNecessities-healthCare")}
                    />
                    <CategoryNameLabel>日用品・ヘルスケア</CategoryNameLabel>
                  </CategoryDiv>
                  <CategoryDiv>
                    <BaseCheckInput
                      type="checkbox"
                      value="cosmetics-hairCare"
                      onClick={handleSelectItem}
                      defaultChecked={recommendItem ? recommendItemCategory("cosmetics-hairCare") : recommendItem.includes("cosmetics-hairCare")}
                    />
                    <CategoryNameLabel>コスメ・ヘアケア</CategoryNameLabel>
                  </CategoryDiv>
                  <CategoryDiv>
                    <BaseCheckInput
                      type="checkbox"
                      value="baby-kids"
                      onClick={handleSelectItem}
                      defaultChecked={recommendItem ? recommendItemCategory("baby-kids") : recommendItem.includes("baby-kids")}
                    />
                    <CategoryNameLabel>ベビー・キッズ</CategoryNameLabel>
                  </CategoryDiv>
                  <CategoryDiv>
                    <BaseCheckInput
                      type="checkbox"
                      value="electronics"
                      onClick={handleSelectItem}
                      defaultChecked={recommendItem ? recommendItemCategory("electronics") : recommendItem.includes("electronics")}
                    />
                    <CategoryNameLabel>家電</CategoryNameLabel>
                  </CategoryDiv>
                  <CategoryDiv>
                    <BaseCheckInput
                      type="checkbox"
                      value="sports-outdoor"
                      onClick={handleSelectItem}
                      defaultChecked={recommendItem ? recommendItemCategory("sports-outdoor") : recommendItem.includes("sports-outdoor")}
                    />
                    <CategoryNameLabel>スポーツ・アウトドア</CategoryNameLabel>
                  </CategoryDiv>
                </CategoriesDiv>
                <AccountInfoInputButton type="submit" value="登録" />
              </BaseForm>
            </FormContainerInnerDiv>
          </FormContainerDiv>
        </>:
        <>
          <Header />
          <LoadPageDiv>ロード中</LoadPageDiv>
        </>
      }
    </>
  );
};


const FormContainerDiv = styled.div`
  width: 100%;
  padding: 100px 0px 30px 0px;
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

const LoadPageDiv = styled.div`
  width: 100%;
  text-align: center;
`;


export default AccountSetUp;