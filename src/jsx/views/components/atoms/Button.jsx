import styled from "styled-components";
import { sp } from "../../../common/context/ResponsiveMedia";


//認証ボタン
const BaseButton = styled.button`
  width: 250px;
  height: 40px;
  text-align: center;
  color: white;
  border-radius: 50px;

  ${sp`
    width: 50%;
    height: 35px;
  `}
`;

// Google認証ボタン
export const GoogleAuthButton = styled(BaseButton)`
  display: block;
  margin: 0 auto;
  background-color: green;

  ${sp`
    font-size: 10px;
  `}
`;

// ログインボタン
export const LoginButton = styled(BaseButton)`
  display: block;
  margin: 0 auto;
  background-color: blue;
`;

// アカウント登録ボタン
export const RegisterButton = styled(BaseButton)`
  display: block;
  margin: 0 auto;
  background-color: red;
`;

// パスワードリセットボタン
export const PwResetButton = styled.button`
  display: block;
  width: 140px;
  height: 40px;
  margin: 0 auto;
  font-weight: bold;
  border-radius: 10px;
  &:hover {
    background-color: #ff0000;
    color: #ffffff;
  };

  ${sp`
    width: 150px;
    height: 35px;
  `}
`;

// アカウント情報登録ボタン
export const AccountInfoInputButton = styled.input`
  display: block;
  width: 100px;
  height: 40px;
  margin: 0 auto;
  font-weight: bold;
  border-radius: 10px;
  &:hover {
    background-color: #ff0000;
    color: #ffffff;
  };

  ${sp`
    width: 150px;
    height: 35px;
  `}
`;

// アカウント情報登録ボタン
export const AccountInfoButton = styled.button`
  display: block;
  width: 100px;
  height: 40px;
  margin: 0 auto;
  font-weight: bold;
  border-radius: 10px;
  &:hover {
    background-color: #ff0000;
    color: #ffffff;
  };

  ${sp`
    width: 150px;
    height: 35px;
  `}
`;


export const WithdrawalButton = styled(PwResetButton)``;