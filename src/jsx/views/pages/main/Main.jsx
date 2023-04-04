import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HOST_DOMAIN } from "../../../common/constant/constants";
import Header from "../../components/blocks/header/Header";
import ItemContainer from "../../components/blocks/mainPageItemContainer/ItemContainer";


function Main() {
  const [ items, setItems ] = useState();
  const [ loading, setLoading ] = useState();

   // DBからアイテム情報をすべて取得
   useEffect(() => {
    setLoading(false);
    fetch(HOST_DOMAIN + "/getImage")
      .then((response) => {
        response.json()
        .then((data) => {
          setItems(data);
          setLoading(true);
        });
      });
  }, []);

  const itemsDisplay = () => {
    const itemsDisplayMainPage = items.map((value, index) => {
      return (
        <Link to={`item/${value.id}`} key={index}>
          <ItemContainer
            itemId={value.id}
            itemName={value.item_name}
            brand={value.brand}
            itemCategory={value.item_category}
            itemUrl={value.item_img_url}
          />
        </Link>
      );
    });
    return itemsDisplayMainPage;
  };

  const LoadItems = () => {
    const loadingItems = <LoadPage>ロード中</LoadPage>;
    return loadingItems;
  };

  // 取得したアイテム情報を個別に表示
  return (
    <>
      <Header />
      <Container>
        <ItemSpace>
          {loading ?
            itemsDisplay() : LoadItems()
          }
        </ItemSpace>
      </Container>
    </>
  );
};


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

const LoadPage = styled.div``;


export default Main;
