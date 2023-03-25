import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HOST_DOMAIN } from "../../../common/constant/constants";
import Header from "../../components/blocks/header/Header";
import ItemContainer from "../../components/blocks/mainPageItemContainer/ItemContainer";


function Main() {
  const [ items, setItems ] = useState();

   // DBからアイテム情報をすべて取得
   useEffect(() => {
    fetch(HOST_DOMAIN + "/getImage")
      .then((response) => {
        response.json()
        .then((data) => {
          setItems(data);
        });
      });
  }, []);

  // 取得したアイテム情報を個別に表示
  return (
    <>
      <Header />
      <Container>
        <ItemSpace>
          {/* TODO:undefinedを変更する */}
        {typeof items !== "undefined" && items.map((value, index) => {
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
        })}
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


export default Main;
