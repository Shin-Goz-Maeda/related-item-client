import styled from "styled-components";
import { sp, tb, pc, lg } from "../../../../../common/context/ResponsiveMedia";


function ItemImg(props) {
  // ItemInfoからアイテム画像のURLを受け取る。
  const { itemImgUrl } = props;

  return (
    <ItemImgContainerDiv>
      <ItemDisplayImg src={itemImgUrl}></ItemDisplayImg>
    </ItemImgContainerDiv>
  );
};


const ItemImgContainerDiv = styled.div`
  width: auto;
  height: auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  ${lg`
    margin-right: 5px;
  `}

  ${pc`
    margin-right: 5px;
  `}

  ${tb`
    width: 80%;
    margin: 0 auto;
    border-radius: 10px 10px 0 0;
  `}

  ${sp`
    width: 80%;
    margin: 0 auto;
    border-radius: 10px 10px 0 0;
  `}
`;

const ItemDisplayImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;


export default ItemImg;