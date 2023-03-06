import styled from "styled-components";

// ベースのボタン
const BaseButton = styled.button`
  text-align: center;
  color: white;
  width: 100px;
  height: 50px;
  margin-right: 50px;
`;

const FirebaseLogInButton = styled.button`
  text-align: center;
  color: white;
  width: 200px;
  height: 50px;
  margin-right: 50px;
  border-radius: 10px;
`;

// 新規登録ボタン
export const SignUpButton = styled(BaseButton)`
  background-color: green;
`;

// ログインボタン
export const SignInButton = styled(BaseButton)`
  background-color: blue;
`;

// Googleログインボタン
export const GoogleSignInButton = styled(FirebaseLogInButton)`
  background-color: green;
`;

// ログアウトボタン
export const LogOutButton = styled(BaseButton)`
  background-color: red;
`;