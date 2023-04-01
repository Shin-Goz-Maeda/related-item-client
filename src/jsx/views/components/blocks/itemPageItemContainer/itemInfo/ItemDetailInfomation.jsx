import styled from "styled-components";


function ItemDetailInformation(props) {
  // ItemInfoからアイテム情報を受け取る。
  const { itemName, brand, itemInfo, itemCategory } = props;

  return (
    <ItemInfoContainer>
      <ItemInfoLists>
        <ItemInfoList>{itemName}</ItemInfoList>
        <ItemInfoList>{brand}</ItemInfoList>
        <ItemInfoList>{itemCategory}</ItemInfoList>
        <ItemInfoList>{itemInfo}</ItemInfoList>
      </ItemInfoLists>
    </ItemInfoContainer>
  );
};


const ItemInfoContainer = styled.div`
  width: 50%;
  height: 50%;
  border: 1px solid blue;
  margin: 0 auto;
  overflow-y: scroll;
`;

const ItemInfoLists = styled.ul`
  list-style: none;
`;

const ItemInfoList = styled.li``;


export default ItemDetailInformation;