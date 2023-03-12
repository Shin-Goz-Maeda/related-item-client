import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import logoImg from '../../../../img/Logo.jpeg';
import { LogOutButton } from '../../components/atoms/Button';
import { Link, useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from "../../../common/firebase/firebase";
import { useContext } from 'react';
import { AuthContext } from '../../../common/context/AuthContext';

const Header = (props) => {
  const { setUser, setSignInCheck } = useContext(AuthContext);
  const navigate = useNavigate();
  const { onClick } = props;

  // ログアウト処理
  const handleLogout = () => {
    setSignInCheck(false);
    setUser("");
    signOut(auth);
    navigate("/login");
  };

  return (
    <HeaderContainer id="header">
      <MenuContainer>
        <MenuIcon onClick={onClick}/>
      </MenuContainer>
      <LogoContainer>
        <Link to="/"><LogoImg src={logoImg} /></Link>
      </LogoContainer>
      <ButtonContainer>
        <LogOutButton onClick={handleLogout}>
          <Link to="login">ログアウト</Link>
        </LogOutButton>
      </ButtonContainer>
    </HeaderContainer>
  )
};

const HeaderContainer = styled.div`
  display: flex;
  position: relative;
  border: 5px solid #000;
  z-index: 999;
`;

const MenuContainer = styled.div``;

const LogoContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
`;

const LogoImg = styled.img`
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