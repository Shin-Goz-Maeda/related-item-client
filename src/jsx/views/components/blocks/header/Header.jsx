import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../common/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../../common/firebase/firebase";
import styled from "styled-components";
import { sp } from "../../../../common/context/ResponsiveMedia";
import Menu from "../menu/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import LogoImg from "../../../../../img/Logo.jpeg";
import Button from "@mui/material/Button";
import { BaseLogoImg } from "../../atoms/Logo";


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
    <HeaderContainerDiv>
      <MenuContainerDiv>
        <MenuIcon
          style={{
            height: 50,
            width: 50
          }}
          onClick={() => setDrawerOpened(true)}
        />
        <Drawer
          anchor={"left"}
          open={drawerOpened}
          onClose={() => setDrawerOpened(false)}
        >
          <Menu />
        </Drawer>
      </MenuContainerDiv>
      <LogoContainerDiv>
        <Link to="/">
          <BaseLogoImg src={LogoImg} />
        </Link>
      </LogoContainerDiv>
      <ButtonContainerDiv>
        <Button
          variant="outlined"
          style={{
            height: 40,
            width: 100,
            fontSize: 12,
            fontWeight: "bold"
          }}
          sx={{
            border: 2,
            borderColor: "grey.500",
            "&:hover": {
              border: "none",
              backgroundColor: "red",
              color: "white"
            }
          }}
          onClick={handleLogout}
        >
          <Link
            to="login"
            style={{
              textDecoration: "none",
              color: "#000"
            }}
          >ログアウト</Link>
        </Button>
      </ButtonContainerDiv>
    </HeaderContainerDiv>
  );
};


const HeaderContainerDiv = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const MenuContainerDiv = styled.div`
  padding-left: 30px;

  ${sp`
    padding-left: 15px;
  `}
`;

const LogoContainerDiv = styled.div`
  height: 100%;
`;

const ButtonContainerDiv = styled.div`
  padding-right: 30px;

  ${sp`
    padding-right: 15px;
  `}
`;


export default Header;