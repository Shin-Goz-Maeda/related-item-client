import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../common/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../../common/firebase/firebase";
import styled from "styled-components";
import Menu from "../menu/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import LogoImg from "../../../../../img/Logo.jpeg";
import { LogOutButton } from "../../atoms/Button";


function Header() {
  const { userLoggedInState } = useContext(AuthContext);
  const navigate = useNavigate();

  // メニューの状態のフラグ
  const [ drawerOpened, setDrawerOpened ] = useState(false);

  // ログアウト処理
  const handleLogout = () => {
    userLoggedInState(false, "");
    signOut(auth);
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <MenuContainer>
        <MenuIcon
          style={{height: 50, width:50 }}
          onClick={() => setDrawerOpened(true)}
        />
        <Drawer
          anchor={"left"}
          open={drawerOpened}
          onClose={() => setDrawerOpened(false)}>
          <Menu />
        </Drawer>
      </MenuContainer>
      <LogoContainer>
        <Link to="/"><Logo src={LogoImg} /></Link>
      </LogoContainer>
      <ButtonContainer>
        <LogOutButton onClick={handleLogout}>
          <Link to="login">ログアウト</Link>
        </LogOutButton>
      </ButtonContainer>
    </HeaderContainer>
  );
};


const HeaderContainer = styled.div`
  display: flex;
  position: relative;
  border: 5px solid #000;
  z-index: 999;
`;

const MenuContainer = styled.div`
display: flex;
position: absolute;
top: 35%;
left: 2%;`;

const LogoContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
`;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  top: 35%;
  right: 0%;
`;


export default Header;