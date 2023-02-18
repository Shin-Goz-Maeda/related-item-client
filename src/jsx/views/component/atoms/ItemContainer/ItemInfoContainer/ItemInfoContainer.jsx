import styled from "styled-components";

const ItemInfoContainer = (props) => {
  const { itemName, brand, itemCategory } = props;

  return (
    <ItemInfoContent id='itemInfo' className='itemInfo'>
      <ItemInfoLists>
        <IntemInfoList id='brand' className='item'>{brand}</IntemInfoList>
        <IntemInfoList id='itemName' className='item'>{itemName}</IntemInfoList>
        <IntemInfoList id='itemCategory' className='item'>{itemCategory}</IntemInfoList>
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

const IntemInfoList = styled.li`
  list-style: none;
`;

export default ItemInfoContainer;