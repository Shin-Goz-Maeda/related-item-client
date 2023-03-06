import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../header/Header";
import Menu from "../../components/blocks/menu/Menu";
import { HOST_DOMAIN } from '../../../common/constant/constants';
import ItemInfo from '../../components/blocks/itemItemContainer/itemInfo/ItemInfo';
import InstagramImg from '../../components/blocks/itemItemContainer/instagramInfo/instagramImg/InstagramImg';
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
    fetch(HOST_DOMAIN + "/item/" + id)
      .then((response) => {
        response.json()
      .then((data) => {
        setItem(data)
        setLoaded(true);
        })
      });
  }, [id]);

  useEffect(() => {
    // 投稿の描画が終わったらスクリプトを読みこませる。
    if (loaded) {
      const script = document.createElement("script");
      script.type = "text/javascript";

      let attr = document.createAttribute("src");
      attr.value = "//www.instagram.com/embed.js";
      script.setAttributeNode(attr);

      const head = document.getElementsByTagName("head")[0];
      head.appendChild(script);
    }
  }, [loaded]);

  const showInstagramPost = () => {
    const a = item.map((value, key) => <InstagramImg key={key} instagramPost={value.instagram_embed_code} />)
    return a
  };

  const LoadingPost = () => {
    const c = <InstagramImg loaded={loaded}/>
    return c;
  };

  return (
    <>
      <Header onClick={handleMenu} />
      <Container>
        { menuDisplay() }
        <ItemDisplay>
          <SelectItem>{loaded ?
            <ItemInfo
                itemName={item[0].item_name}
                brand={item[0].brand}
                itemCategory={item[0].item_category}
                itemImgUrl={item[0].item_img_url}
                itemInfo={item[0].item_info}
              /> :
            <ItemInfo loaded={loaded} />}
          </SelectItem>
          <SelectRelateItem>{loaded ?
            showInstagramPost() :  LoadingPost()
          }
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
