import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../header/Header";
import Menu from "../../components/blocks/menu/Menu";
import { HOST_DOMAIN } from '../../../common/constant/constants';
import ItemInfo from '../../components/blocks/itemItemContainer/itemInfo/ItemInfo';
import styled from "styled-components";

const Item = () => {
  const [ item, setItem ] = useState();
  const [ isShowMenu, setIsShowMenu] = useState(false);
  const [ loaded, setLoaded ] = useState(false);

  // URLからアイテムナンバーを取得
  const { id } = useParams();

  const handleMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  const menuDisplay = () => {
    if (isShowMenu) {
      return <Menu />;
    }
  };

  useEffect(() => {
    setLoaded(false);
    fetch(HOST_DOMAIN + "/item/" + id)
      .then((response) => {
        response.json()
      .then((data) => {
        setItem(data)
        setLoaded(true);
        })
      });
  }, []);

  return (
    <>
      <Header onClick={handleMenu} />
      <Container>
        { menuDisplay() }
        <ItemDisplay>
          <SelectItem>{loaded ?
            <ItemInfo
                itemName={item.itemName}
                brand={item.brand}
                itemCategory={item.itemCategory}
                itemImgUrl={item.itemImgUrl}
                itemInfo={item.itemInfo}
              /> :
            <ItemInfo loaded={loaded} />}
          </SelectItem>
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
