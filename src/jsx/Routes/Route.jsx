import { BrowserRouter, Route, Routes } from 'react-router-dom';

// 各ページをインポート
import Main from '../views/pages/main/Main';
import Item from '../views/pages/item/Item';
import Login  from '../views/pages/login/Login';
import PwReconfiguration from '../views/pages/pwreset/PwReconfiguration';
import PwReset from '../views/pages/pwreset/PwReset';
import PwReconfigurationComplete from '../views/pages/pwreset/ReConfigurationComplete';
import Search from '../views/pages/serch/Search';
import SignUp from '../views/pages/signup/SignUp';
import WithdrawalComplete from '../views/pages/withdrawal/WithdrawalComplete';
import WithdrawalConfirmation from '../views/pages/withdrawal/WithdrawalConfirmation';

const RouterConfig =() => {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="item" element={<Item />} />
        <Route path="login" element={<Login />} />
        <Route path="pwreconfiguration" element={<PwReconfiguration />} />
        <Route path="pwreset" element={<PwReset />} />
        <Route path="pwreconfigurationcomplete" element={<PwReconfigurationComplete />} />
        <Route path="search" element={<Search />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="withdrawalcomplete" element={<WithdrawalComplete />} />
        <Route path="withdrawalconfirmation" element={<WithdrawalConfirmation />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default RouterConfig;