import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { sp } from "../../../common/context/ResponsiveMedia";
import { AuthContext } from "../../../common/context/AuthContext";
import { HOST_DOMAIN } from "../../../common/constant/Constant";
import Header from "../../components/blocks/header/Header";
import { AccountInfoButton } from "../../components/atoms/Button";
import { PageTitleH1 } from "../../components/atoms/PageTitle";
import { AccountSetUpLabel, AccountSetUpInput, BaseCheckInput, CircleInput } from "../../components/atoms/Form";


function AccountInfo() {
  const { user, postServer } = useContext(AuthContext);
  const [ userName, setUserName ] = useState("");
  const [ selectedSex, setSelectedSex ] = useState("");
  const [ birthDate, setBirthDate ] = useState("");
  const [ selectedRecommendItem, setSelectedRecommendItem ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const email = user.email;

  useEffect(()=> {
    setLoading(false);
    // DBから登録済のアカウント情報を取得
    fetch(HOST_DOMAIN + "/get-user-info", postServer(email))
      .then((response) => {
        response.json()
        .then((result) => {
          setUserName(result[0].user_name);
          setSelectedSex(result[0].sex);
          setBirthDate(result[0].birth_date);
          setSelectedRecommendItem(result[0].want_to_item);
          setLoading(true);
        });
      });
  }, []);

  const recommendItemCategory = (itemCategory) => {
    const itemLength = selectedRecommendItem.length;
    const recommendItemData = selectedRecommendItem;
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
              <FormDiv>
                <PageTitleH1>アカウント情報</PageTitleH1>
                <UserNameDiv>
                  <AccountSetUpLabel htmlFor="userName">ユーザ名</AccountSetUpLabel>
                  <AccountSetUpInput
                    type="text"
                    placeholder="username"
                    defaultValue={userName}
                    disabled
                  />
                </UserNameDiv>
                <SexDiv>
                  <AccountSetUpLabel htmlFor="sex">性別</AccountSetUpLabel>
                  <SexLabel>男</SexLabel>
                  <CircleInput
                    name="sex"
                    type="radio"
                    value="male"
                    defaultChecked={selectedSex === "male"}
                    disabled
                  />
                  <SexLabel>女</SexLabel>
                  <CircleInput
                    name="sex"
                    type="radio"
                    required="required"
                    value="female"
                    defaultChecked={selectedSex === "female"}
                    disabled
                  />
                </SexDiv>
                <BirthDayDiv>
                  <AccountSetUpLabel htmlFor="birthDay">誕生日</AccountSetUpLabel>
                  <AccountSetUpInput
                    type="date-local"
                    defaultValue={birthDate ? birthDate : ""}
                    disabled
                  />
                </BirthDayDiv>
                <CategoriesDiv>
                  <AccountSetUpLabel htmlFor="recommendItem">気になるカテゴリー</AccountSetUpLabel>
                    <CategoryDiv>
                      <BaseCheckInput
                        type="checkbox"
                        value="fashion"
                        defaultChecked={recommendItemCategory("fashion")}
                        disabled
                      />
                      <CategoryNameLabel>ファッション</CategoryNameLabel>
                    </CategoryDiv>
                    <CategoryDiv>
                      <BaseCheckInput
                        type="checkbox"
                        value="food-drink"
                        defaultChecked={recommendItemCategory("food-drink")}
                        disabled
                      />
                      <CategoryNameLabel>グルメ・飲料</CategoryNameLabel>
                    </CategoryDiv>
                    <CategoryDiv>
                      <BaseCheckInput
                        type="checkbox"
                        value="dailyNecessities-healthCare"
                        defaultChecked={recommendItemCategory("dailyNecessities-healthCare")}
                        disabled
                      />
                      <CategoryNameLabel>日用品・ヘルスケア</CategoryNameLabel>
                    </CategoryDiv>
                    <CategoryDiv>
                      <BaseCheckInput
                        type="checkbox"
                        value="cosmetics-hairCare"
                        defaultChecked={recommendItemCategory("cosmetics-hairCare")}
                        disabled
                      />
                      <CategoryNameLabel>コスメ・ヘアケア</CategoryNameLabel>
                    </CategoryDiv>
                    <CategoryDiv>
                      <BaseCheckInput
                        type="checkbox"
                        value="baby-kids"
                        defaultChecked={recommendItemCategory("baby-kids")}
                        disabled
                      />
                      <CategoryNameLabel>ベビー・キッズ</CategoryNameLabel>
                    </CategoryDiv>
                    <CategoryDiv>
                      <BaseCheckInput
                        type="checkbox"
                        value="electronics"
                        defaultChecked={recommendItemCategory("electronics")}
                        disabled
                      />
                      <CategoryNameLabel>家電</CategoryNameLabel>
                    </CategoryDiv>
                    <CategoryDiv>
                      <BaseCheckInput
                        type="checkbox"
                        value="sports-outdoor"
                        defaultChecked={recommendItemCategory("sports-outdoor")}
                        disabled
                      />
                      <CategoryNameLabel>スポーツ・アウトドア</CategoryNameLabel>
                    </CategoryDiv>
                </CategoriesDiv>
                <AccountInfoButton>
                  <Link
                    to="/accountsetup"
                    style={{
                      textDecoration: "none",
                      color: "#333333",
                      fontWeight: "bold"
                    }}
                  >編集
                  </Link>
                </AccountInfoButton>
              </FormDiv>
            </FormContainerInnerDiv>
          </FormContainerDiv>
        </> :
        <>
          <Header />
          <LoadPageDiv>ロード中</LoadPageDiv>
        </>
      }
    </>
  )
};


const FormContainerDiv = styled.div`
  width: 100%;
  padding: 100px 0px 30px 0px;
`;

const FormContainerInnerDiv = styled.div`
  width: 100%;
  padding-top: 20px;
`;

const FormDiv = styled.div`
  width: 400px;
  margin: 0 auto;
  margin-bottom: 10px;

  ${sp`
    width: 100%;
  `}
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


export default AccountInfo;
