import styled from "styled-components";
import ItemImage from "../mainPageItemContainer/ItemImage";
import ItemInfoContainer from "../mainPageItemContainer/ItemInfoContainer";


function ItemContainer(props) {
  // メインページからアイテム情報を受け取る。
  const { itemName, brand, itemUrl, itemCategory } = props;

  return (
    <ItemsContainerDiv >
      <ItemImage itemUrl={itemUrl} />
      <ItemInfoContainer
        itemName={itemName}
        brand={brand}
        itemCategory={itemCategory}
      />
    </ItemsContainerDiv>
  );
};


const ItemsContainerDiv = styled.div`
  display: inline-block;
  margin: 10px;
  break-inside: avoid;
  border: solid 2px #A9A9A9;
  border-radius: 10px;
  &:hover {
    transition: 0.3s ;
    opacity: 0.75;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);
  };
`;


export default ItemContainer;