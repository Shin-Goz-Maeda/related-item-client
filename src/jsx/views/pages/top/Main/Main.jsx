import Header from '../../Header/Header';
import ItemContainer from './ItemContainer/ItemContainer';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const Main = () => {
  const [ items, setItems ] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/getImage")
      .then((response) => {
        response.json()
      .then((data) => {
        setItems(data)
      });
      console.log(items);
    });
  }, []);

  return (
    <>
      <Header />
      <Container id='container'>
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
      </Container>
    </>
  );
}

const Container = styled.div`
  border: 5px solid #000;
  height: 1000px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  justify-content: space-around;
`;

export default Main;
