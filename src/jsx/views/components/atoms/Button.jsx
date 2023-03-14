import styled from "styled-components";

// ベースのボタン
const BaseButton = styled.button`
  text-align: center;
  color: white;
  width: 100px;
  height: 50px;
  margin-right: 50px;
`;

// 新規登録ボタン
export const SignUpButton = styled(BaseButton)`
  background-color: green;
`;

// ログインボタン
export const SignInButton = styled(BaseButton)`
  background-color: blue;
`;

// ログインボタン
export const LogOutButton = styled(BaseButton)`
  background-color: red;
`;

//認証ボタン
const AuthenticationButton = styled.button`
  text-align: center;
  color: white;
  width: 250px;
  height: 50px;
  margin-right: 50px;
`;

// Google認証ボタン
export const GoogleAuthButton = styled(AuthenticationButton)`
  background-color: lightgreen;
`;