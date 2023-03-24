import styled from "styled-components";


function ItemInfoContainer(props) {
  const { itemName, brand, itemCategory } = props;

  return (
    <ItemInfoContent
      id="itemInfo"
      className="itemInfo"
    >
      <ItemInfoLists>
        <ItemInfoList
          id="brand"
          className="item"
        >
          {brand}
        </ItemInfoList>
        <ItemInfoList
          id="itemName"
          className="item"
        >
          {itemName}
        </ItemInfoList>
        <ItemInfoList
          id="itemCategory"
          className="item"
        >
          {itemCategory}
        </ItemInfoList>
      </ItemInfoLists>
    </ItemInfoContent>
  );
};


const ItemInfoContent = styled.div`
  width: 95%;
  height: 30%;
  border: 2px solid red;
  margin-bottom: 5px;
  margin-right: auto;
  margin-left: auto;
`;

const ItemInfoLists = styled.ul`
  padding: 0;
`;

const ItemInfoList = styled.li`
  list-style: none;
`;


export default ItemInfoContainer;