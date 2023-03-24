import styled from "styled-components";
import ItemImage from "./itemImage/ItemImage";
import ItemInfoContainer from "./itemInfoContainer/ItemInfoContainer";


function ItemContainer(props) {
  const { itemName, brand, itemUrl, itemCategory } = props;

  return (
    <ItemsContainer className="itemContainer">
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