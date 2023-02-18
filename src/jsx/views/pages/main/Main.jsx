import Header from '../header/Header';
import Menu from '../../component/atoms/Menu/Menu';
import ItemContainer from '../../component/atoms/ItemContainer/ItemContainer';
import { localhost } from '../../component/atoms/constant/constants';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const Main = () => {
  const [ items, setItems ] = useState();
  const [ isMenu, setIsMenu ] = useState(false);

  const handleMenu = () => {
    setIsMenu(!isMenu);
    console.log(isMenu);
  };


  const MenuDisplay = () => {
    if (isMenu) {
      return <Menu />;
    }
  };

  useEffect(() => {
    fetch(localhost + "/getImage")
      .then((response) => {
        response.json()
      .then((data) => {
        setItems(data)
      });
    });
  }, []);

  return (
    <>
      <Header onClick={handleMenu} />
      <Container id='container'>
        { MenuDisplay() }
        <ItemSpace>
        {typeof items !== "undefined" && items.map((value) => {
          return (
            <ItemContainer
              key={value.id}
              itemName={value.itemName}
              brand={value.brand}
              itemCategory={value.itemCategory}
              itemUrl={value.itemUrl}
            />
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
  z-index: 1;
`;

const ItemSpace = styled.div`
  height: 1000px;
  display: flex;
  overflow-y: scroll;
  flex-wrap: wrap;
  justify-content: space-around;
  z-index: 1;
`;

export default Main;
