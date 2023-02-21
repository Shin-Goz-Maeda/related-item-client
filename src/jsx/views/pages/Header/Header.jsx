import styled from 'styled-components';
<<<<<<< Updated upstream
=======
import MenuIcon from '@mui/icons-material/Menu';
import logoImg from '../../../../img/Logo.jpeg';
import { SignUpButton, SignInButton } from '../../components/atoms/Button';
import { Link } from "react-router-dom";

const Header = (props) => {
  const { onClick } = props;
>>>>>>> Stashed changes

const Header = () => {
  return (
    <Div id="header">
    </Div>
  );
};

const Div = styled.div`
  padding: 30px;
  border: 5px solid #000;
`;

export default Header;