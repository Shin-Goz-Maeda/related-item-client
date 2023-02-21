import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import logoImg from '../../../../img/Logo.jpeg';
import Menu from '../../component/atoms/Menu/Menu';
import { SignUpButton, SignInButton } from '../../component/block/Button';
import { Link } from "react-router-dom";

const Header = (props) => {
  const { onClick } = props;

  return (
    <HeaderContainer id="header">
      <MenuContainer>
        <MenuIcon onClick={onClick}/>
      </MenuContainer>
      <LogoContainer>
        <Link to="/"><LogoImg src={logoImg} /></Link>
      </LogoContainer>
      <ButtonContainer>
        <SignUpButton>
          <Link to="signup">新規登録</Link>
        </SignUpButton>
        <SignInButton>
          <Link to="login">ログイン</Link>
        </SignInButton>
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