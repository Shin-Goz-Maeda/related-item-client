import styled from "styled-components";
import { sp } from "../../../common/context/ResponsiveMedia";


export const PageTitleH1 = styled.h1`
  margin-bottom: 15px;
  text-align: center;

  ${sp`
    font-size: 25px;
  `}
`;

export const NonPageTitle = styled(PageTitleH1)`
  font-size: 50px;
`;