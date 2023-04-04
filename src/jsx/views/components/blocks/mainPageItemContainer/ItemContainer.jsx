import styled from "styled-components";
import ItemImage from "../mainPageItemContainer/ItemImage";
import ItemInfoContainer from "../mainPageItemContainer/ItemInfoContainer";


function ItemContainer(props) {
  // メインページからアイテム情報を受け取る。
  const { itemName, brand, itemUrl, itemCategory } = props;

  return (
    <ItemsContainer >
      <ItemImage itemUrl={itemUrl} />
      <ItemInfoContainer
        itemName={itemName}
        brand={brand}
        itemCategory={itemCategory}
      />
    </ItemsContainer>
  );
};


const ItemsContainer = styled.div`
  width: 300px;
  height: 350px;
  margin: 20px;
  border: 3px solid blue;
`;


export default ItemContainer;