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
