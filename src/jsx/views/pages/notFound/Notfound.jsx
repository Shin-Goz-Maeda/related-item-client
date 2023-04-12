import { Link } from "react-router-dom";
import styled from "styled-components";
import { NonPageTitle } from "../../components/atoms/PageTitle";


function NotFound() {
  return (
    <>
      <NotFoundContainerDiv>
        <NonPageTitle>404</NonPageTitle>
        <PageInfoP>ページが見つかりません。</PageInfoP>
      </NotFoundContainerDiv>
      <RedirectContainerDiv>
        <Link to="/">ホームはこちら</Link>
      </RedirectContainerDiv>
    </>
  );
};


const NotFoundContainerDiv = styled.div`
  width: 100%;
  padding: 50px 0px 30px 0px;
`;

const PageInfoP = styled.p`
  text-align: center;
`;

const RedirectContainerDiv = styled.div`
  text-align: center;
`;


export default NotFound;


