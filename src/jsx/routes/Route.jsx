import { BrowserRouter, Route, Routes } from 'react-router-dom';

// 各ページをインポート
import Main from '../views/pages/main/Main';
import Item from '../views/pages/item/Item';
import Login  from '../views/pages/login/Login';
import PwReconfiguration from '../views/pages/pwreset/PwReconfiguration';
import PwReset from '../views/pages/pwreset/PwReset';
import PwReconfigurationComplete from '../views/pages/pwreset/ReConfigurationComplete';
import Search from '../views/pages/search/Search';
import SignUp from '../views/pages/signup/SignUp';
import WithdrawalComplete from '../views/pages/withdrawal/WithdrawalComplete';
import WithdrawalConfirmation from '../views/pages/withdrawal/WithdrawalConfirmation';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from "../common/context/AuthContext";

const RouterConfig =() => {

  return (
    <>
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
            path="search"
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />
          <Route
            path="withdrawalcomplete"
            element={
              <PrivateRoute>
                <WithdrawalComplete />
              </PrivateRoute>
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
            path="pwreset"
            element={
              <PwReset />
            }
          />
          <Route
            path="pwreconfiguration"
            element={
              <PwReconfiguration />
            }
          />
          <Route
            path="pwreconfigurationcomplete"
            element={
              <PwReconfigurationComplete />
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default RouterConfig;