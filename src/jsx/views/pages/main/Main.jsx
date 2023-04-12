import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { pc, lg } from "../../../common/context/ResponsiveMedia";
import { HOST_DOMAIN } from "../../../common/constant/Constant";
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
    const loadingItems = <LoadPageDiv>ロード中</LoadPageDiv>;
    return loadingItems;
  };

  // 取得したアイテム情報を個別に表示
  return (
    <>
      <Header />
      <MainContainerDiv>
        <ItemSpaceDiv>
          {loading ?
            itemsDisplay() : LoadItems()
          }
        </ItemSpaceDiv>
      </MainContainerDiv>
    </>
  );
};


const MainContainerDiv = styled.div`
  padding: 120px 20px 30px 20px;
  background-color: #F6F6F6;
`;

const ItemSpaceDiv = styled.div`
  column-gap: 0;
  column-count: 3;

  ${lg`
    column-count: 5;
  `}

  ${pc`
    column-count: 4;
  `}
`;

const LoadPageDiv = styled.div`
  text-align: center;
`;


export default Main;
