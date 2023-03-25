import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../common/context/AuthContext";
import PrivateRoute from "./PrivateRoute";

// 各ページをインポート
import Main from "../views/pages/main/Main";
import Item from "../views/pages/item/Item";
import Login  from "../views/pages/login/Login";
import PwReset from "../views/pages/pwreset/PwReset";
import SignUp from "../views/pages/signup/SignUp";
import MailAuth from "../views/pages/MailAuth/MailAuth";
import AccountSetUp from "../views/pages/AccountSetUp/AccountSetUp";
import WithdrawalComplete from "../views/pages/withdrawal/WithdrawalComplete";
import WithdrawalConfirmation from "../views/pages/withdrawal/WithdrawalConfirmation";


// ルーティング処理
function RouterConfig() {
  // <PrivateRoute>で囲っている箇所は、ログイン後のみアクセス可能
  // ログイン前にアクセスした場合は、ログイン画面へリダイレクトする。
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />
          <Route
            path="item/:id"
            element={
              <PrivateRoute>
                <Item />
              </PrivateRoute>
            }
          />
          <Route
            path="withdrawalcomplete"
            element={
              <WithdrawalComplete />
            }
          />
          <Route
            path="withdrawalconfirmation"
            element={
              <PrivateRoute>
                <WithdrawalConfirmation />
              </PrivateRoute>
            }
          />
          <Route
            path="accountsetup"
            element={
              <AccountSetUp />
            }
          />
          <Route
            path="login"
            element={
              <Login />
            }
          />
          <Route
            path="signup"
            element={
              <SignUp />
            }
          />
          <Route
            path="mailauth"
            element={
              <MailAuth />
            }
          />
          <Route
            path="pwreset"
            element={
              <PwReset />
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};


export default RouterConfig;