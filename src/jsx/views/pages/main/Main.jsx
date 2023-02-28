import Header from '../header/Header';
import Menu from '../../components/blocks/menu/Menu';
import { HOST_DOMAIN } from '../../../common/constant/constants';
import ItemContainer from '../../components/blocks/mainItemContainer/ItemContainer';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const Main = () => {
  const [ items, setItems ] = useState();
  const [ isShowMenu, setIsShowMenu ] = useState(false);

  const handleMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  const menuDisplay = () => {
    if (isShowMenu) {
      return <Menu />;
    }
  };

  // DBからアイテム情報をすべて取得
  useEffect(() => {
    fetch(HOST_DOMAIN + "/getImage")
      .then((response) => {
        response.json()
      .then((data) => {
        setItems(data)
      });
    });
    console.log(items)
  }, []);

  return (
    <>
      <Header onClick={handleMenu} />
      <Container id='container'>
        { menuDisplay() }
        <ItemSpace>
        {typeof items !== "undefined" && items.map((value, index) => {
          return (
            <Link to={`item/${value.id}`} key={index}>
              <ItemContainer
                itemId={value.id}
                itemName={value.itemName}
                brand={value.brand}
                itemCategory={value.itemCategory}
                itemUrl={value.itemImgUrl}
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
