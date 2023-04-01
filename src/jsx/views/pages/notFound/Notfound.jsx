import { Link } from "react-router-dom";
import styled from "styled-components";


function NotFound() {
  return (
    <>
      <NotFoundContainer>
        <PageTitle>404</PageTitle>
        <PageExplainText>ページが見つかりません。</PageExplainText>
      </NotFoundContainer>
      <RedirectContainer>
        ホームは<Link to="/">こちら</Link>から
      </RedirectContainer>
    </>
  );
};


const NotFoundContainer = styled.div``;

const PageTitle = styled.h2``;

const PageExplainText = styled.p``;

const RedirectContainer = styled.div``;


export default NotFound;


