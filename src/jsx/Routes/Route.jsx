import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { localhost } from '../common/constant/constants';

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

const RouterConfig =() => {
  const [ items, setItems ] = useState();
  const [ instagramPosts, setInstagramPosts ] = useState([]);

  useEffect(() => {
    fetch(localhost + "/getImage")
      .then((response) => {
        response.json()
      .then((data) => {
        setItems(data)
      });
    });
  }, []);

  useEffect(() => {
    fetch(localhost + "/getInstagramImage")
      .then((response) => {
        response.json()
      .then((data) => {
        setInstagramPosts(data)
      });
    });
  }, [items]);

  useEffect(() => {
    if (instagramPosts.length > 0) {
      const script = document.createElement("script");
      script.type = "text/javascript";

      let attr = document.createAttribute("src");
      attr.value = "//www.instagram.com/embed.js";
      script.setAttributeNode(attr);

      const head = document.getElementsByTagName("head")[0];
      head.appendChild(script);
    }
  }, [instagramPosts]);

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route index element={<Main items={items} />} />
        <Route path="item" element={<Item instagramPosts={instagramPosts} />} />
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