import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../header/Header";
import Menu from "../../components/blocks/menu/Menu";
import { HOST_DOMAIN } from '../../../common/constant/constants';
import ItemInfo from '../../components/blocks/itemItemContainer/itemInfo/ItemInfo';
// import InstagramImg from '../../components/blocks/itemItemContainer/instagramInfo/instagramImg/InstagramImg';
import styled from "styled-components";

const Item = () => {
  const [ items, setItems ] = useState();
  const [isShowMenu, setIsShowMenu] = useState(false);
  // デバック用
  // console.log(instagramPosts);

  const handleMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  const menuDisplay = () => {
    if (isShowMenu) {
      return <Menu />;
    }
  };

  useEffect(() => {
    fetch(HOST_DOMAIN + "/getImage")
      .then((response) => {
        response.json()
      .then((data) => {
        setItems(data)
      });
    });
    // デバック用
    console.log(items)
  }, []);

  const { id } = useParams();
  const itemId = id - 1;
  const item = items[itemId]
  // デバック用
  console.log(itemId);

  return (
    <>
      <Header onClick={handleMenu} />
      <Container>
        { menuDisplay() }
        <ItemDisplay>
          <SelectItem>
            <ItemInfo
              key={item.id}
              itemName={item.itemName}
              brand={item.brand}
              itemCategory={item.itemCategory}
              itemPicUrl={item.itemPicUrl}
              itemInfo={item.itemInfo}
            />
          </SelectItem>
          {/* <SelectRelateItem>
          {typeof instagramPosts !== "undefined" && instagramPosts.map((value) => {
            return (
              <InstagramImg
                key={value.id}
                itemId={value.itemId}
                instagramEmbedCode={value.instagramEmbedCode}
              />
            )
          })};
          </SelectRelateItem> */}
        </ItemDisplay>
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

const ItemDisplay = styled.div`
  width: 100%;
  height: auto;
`;

const SelectItem = styled.div`
  width: 100%;
  height: 50%;
  margin: 0 auto;
  border: 1px solid blue;
`;

const SelectRelateItem = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  margin: 0 auto;
  border: 1px solid blue;
`;



export default Item;