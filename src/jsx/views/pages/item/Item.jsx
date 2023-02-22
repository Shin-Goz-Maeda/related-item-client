import { useState } from 'react';
import Header from "../header/Header";
import Menu from "../../components/blocks/menu/Menu";
import ItemInfo from '../../components/blocks/itemItemContainer/itemInfo/ItemInfo';
import InstagramImg from '../../components/blocks/itemItemContainer/instagramInfo/instagramImg/InstagramImg';
import styled from "styled-components";

const Item = (props) => {
  const { item, instagramPosts } = props;
  const [isMenu, setIsMenu] = useState(false);
  console.log(instagramPosts);

  const handleMenu = () => {
    setIsMenu(!isMenu);
  };

  const menuDisplay = () => {
    if (isMenu) {
      return <Menu />;
    }
  };

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
          <SelectRelateItem>
          {typeof instagramPosts !== "undefined" && instagramPosts.map((value) => {
            return (
              <InstagramImg
                key={value.id}
                itemId={value.itemId}
                instagramEmbedCode={value.instagramEmbedCode}
              />
            )
          })};
          </SelectRelateItem>
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