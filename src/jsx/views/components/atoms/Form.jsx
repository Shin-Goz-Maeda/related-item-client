import styled from "styled-components";
import { sp } from "../../../common/context/ResponsiveMedia";


export const BaseForm = styled.form`
  width: 400px;
  margin: 0 auto;
  margin-bottom: 10px;

  ${sp`
    width: 100%;
  `}
`;

export const BaseFormHeaderDiv = styled.div`
  width: 500px;
  margin: 0 auto;

  ${sp`
    width: 100%;
  `}
`;

export const BaseLabel = styled.label`
  display: block;
  margin: 0 auto;
  margin-bottom: 5px;
  text-align: center;
  color: #333333;
`;

export const BaseInput = styled.input`
  display: block;
  width: 220px;
  height: 10px;
  padding: 10px;
  margin: 0 auto;
  font-size: 15px;
  border-radius: 13px;

  ${sp`
    width: 50%;
  `}
`;

export const BaseCheckInput = styled.input`
  transform: scale(1.5);
`;

export const BaseLineDiv = styled.div`
  margin-bottom: 10px;
  text-align: center;
  color: #333333;
  font-weight: bold;
`;

export const PwResetInput = styled(BaseInput)`
  margin-bottom: 20px;
`;

export const AccountSetUpLabel = styled(BaseLabel)`
  font-weight: bold;
`;

export const AccountSetUpInput = styled(BaseInput)`
  text-align: center;
`;

export const CircleInput = styled(BaseCheckInput)`
  margin-left: 10px;
`;