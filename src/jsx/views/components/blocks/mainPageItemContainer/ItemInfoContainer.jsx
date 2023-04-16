import styled from "styled-components";
import { sp, tb } from "../../../../common/context/ResponsiveMedia";


function ItemInfoContainer(props) {
  const { itemName, brand, itemCategory } = props;

  return (
    <ItemInfoContentDiv>
      <ItemInfoListUl>
        <ItemInfoListLi>{brand}</ItemInfoListLi>
        <ItemInfoListLi>{itemName}</ItemInfoListLi>
        <ItemInfoListLi>{itemCategory}</ItemInfoListLi>
      </ItemInfoListUl>
    </ItemInfoContentDiv>
  );
};


const ItemInfoContentDiv = styled.div`
  width: 85%;
  height: 30%;
  padding: 10px;
  margin: 0 auto;
  background-color: white;
  border-radius: 0 0 10px 10px;

  ${tb`
    padding: 5px;
  `}

  ${sp`
    padding: 2px;
  `}
`;

const ItemInfoListUl = styled.ul``;

const ItemInfoListLi = styled.li`
  list-style: none;
  color: #000;
  font-weight: bold;

  ${sp`
    font-size: 10px;
  `}
`;


export default ItemInfoContainer;