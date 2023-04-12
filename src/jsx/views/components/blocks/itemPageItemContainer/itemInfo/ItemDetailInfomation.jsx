import styled from "styled-components";
import { sp, tb, pc, lg } from "../../../../../common/context/ResponsiveMedia";


function ItemDetailInformation(props) {
  // ItemInfoからアイテム情報を受け取る。
  const { itemName, brand, itemInfo, itemCategory } = props;

  return (
    <ItemInfoContainerDiv>
      <ItemTitleContainerDiv>
        <ItemTitleH5>{itemName}</ItemTitleH5>
      </ItemTitleContainerDiv>
      <BrandTitleContainerDiv>
        <BrandTitleP>ブランド：{brand}</BrandTitleP>
      </BrandTitleContainerDiv>
      <ItemCategoryContainerDiv>
        <ItemCategoryP>カテゴリー：{itemCategory}</ItemCategoryP>
      </ItemCategoryContainerDiv>
      <ItemInfoTitleP>商品詳細</ItemInfoTitleP>
      <ItemInfomationContainerDiv>
        <ItemInfomationP>{itemInfo}</ItemInfomationP>
      </ItemInfomationContainerDiv>
    </ItemInfoContainerDiv>
  );
};


const ItemInfoContainerDiv = styled.div`
  width: 450px;
  height: auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  ${lg`
    margin-left: 5px;
  `}

  ${pc`
    margin-left: 5px;
  `}

  ${tb`
    width: 80%;
    margin: 0 auto;
    border-radius: 0 0 10px 10px;
  `}

  ${sp`
    width: 80%;
    margin: 0 auto;
    border-radius: 0 0 10px 10px;
  `}
`;

const ItemTitleContainerDiv = styled.div`
  width: 100%;
  height: auto;
`;

const BrandTitleContainerDiv = styled.div`
  width: 100%;
  height: 30px;
`;

const ItemCategoryContainerDiv = styled.div`
  width: 100%;
  height: 30px;
`;

const ItemInfomationContainerDiv = styled.div`
  width: 100%;
  height: 200px;
  overflow: auto;
`;

const ItemTitleH5 = styled.h5`
  font-size: 30px;

  ${sp`
    font-size: 20px;
  `}
`;

const BrandTitleP = styled.p``;

const ItemCategoryP = styled.p``;

const ItemInfoTitleP = styled.p``;

const ItemInfomationP = styled.p``;


export default ItemDetailInformation;