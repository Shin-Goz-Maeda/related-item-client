import { css } from "styled-components";
import { MEDIA } from "../constant/Constant";


export const sp = (first, ...interpolations) => css`
  @media (max-width: ${MEDIA.spMax}px) {
    ${css(first, ...interpolations)}
  }
`;

export const tb = (first, ...interpolations) => css`
  @media (min-width: ${MEDIA.spMax + 1}px) and (max-width: ${MEDIA.tbMax}px) {
    ${css(first, ...interpolations)}
  }
`;

export const pc = (first, ...interpolations) => css`
  @media (min-width: ${MEDIA.tbMax + 1}px) and (max-width: ${MEDIA.pcMax}px) {
    ${css(first, ...interpolations)}
  }
`;

export const lg = (first, ...interpolations) => css`
  @media (min-width: ${MEDIA.pcMax + 1}px) {
    ${css(first, ...interpolations)}
  }
`;