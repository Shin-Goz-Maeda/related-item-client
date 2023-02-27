import Header from '../header/Header';
import Menu from '../../components/blocks/menu/Menu';
import ItemContainer from '../../components/blocks/mainItemContainer/ItemContainer';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useState } from 'react';

const Main = (props) => {
  const { handleItemSet, items } = props;
  const [ isShowMenu, setIsShowMenu ] = useState(false);

  const handleMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  const menuDisplay = () => {
    if (isShowMenu) {
      return <Menu />;
    }
  };

  return (
    <>
      <Header onClick={handleMenu} />
      <Container id='container'>
        { menuDisplay() }
        <ItemSpace>
        {typeof items !== "undefined" && items.map((value, index) => {
          return (
            <Link to="item" onClick={() => handleItemSet(value.id)}  key={index}>
              <ItemContainer
                itemId={value.id}
                itemName={value.itemName}
                brand={value.brand}
                itemCategory={value.itemCategory}
                itemUrl={value.itemPicUrl}
              />
            </Link>
          );
        })};
        </ItemSpace>
      </Container>
    </>
  );
}

const Container = styled.div`
  border: 5px solid #000;
  height: 1000px;
  display: flex;
  justify-content: space-around;
`;

const ItemSpace = styled.div`
  height: 1000px;
  display: flex;
  overflow-y: scroll;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default Main;
