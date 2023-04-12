import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { HOST_DOMAIN } from "../../../common/constant/Constant";
import Slide from "../../components/blocks/swiperSlide/Swiper";
import Header from "../../components/blocks/header/Header";
import ItemInfo from "../../components/blocks/itemPageItemContainer/itemInfo/ItemInfo";
import InstagramImg from "../../components/blocks/itemPageItemContainer/instagramInfo/InstagramImg";
import { pc, lg } from "../../../common/context/ResponsiveMedia";


function Item() {
  const [ item, setItem ] = useState();
  const [ loaded, setLoaded ] = useState(false);

  // URLからアイテムナンバーを取得
  const { id } = useParams();

  // DBからidにあったアイテム情報のみを取得
  useEffect(() => {
    setLoaded(false);
    fetch(HOST_DOMAIN + "/item/" + id)
      .then((response) => {
        response.json()
        .then((data) => {
          setLoaded(true);
          setItem(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // インスタの受け込みコードがあるのかを判定
  const showItem = () => {
    if (item.length === 0) {
      const NothingItem = <ItemInfo itemData="該当するデータがありません。" />;
      return NothingItem;
    } else {
      const ItemData = <ItemInfo
        itemName={item[0].item_name}
        brand={item[0].brand}
        itemCategory={item[0].item_category}
        itemImgUrl={item[0].item_img_url}
        itemInfo={item[0].item_info}
      />;
      return ItemData;
    };
  };

  useEffect(() => {
    // 投稿の描画が終わったらスクリプトを読みこませる。
    if (loaded) {
      if (window.instgrm !== undefined) {
        // インスタグラムの埋め込みコードを描画が終わった際に直接メソッドを呼び出すことで埋め込み情報を表示させる。
        window.instgrm.Embeds.process();
      };

      const script = document.createElement("script");
      script.type = "text/javascript";

      const attr = document.createAttribute("src");
      attr.value = "//www.instagram.com/embed.js";
      script.setAttributeNode(attr);

      const head = document.getElementsByTagName("head")[0];
      head.appendChild(script);
    };
  }, [loaded]);

  // インスタの受け込みコードがあるのかを判定
  const showInstagramPost = () => {
    if (item[0].instagram_embed_code === null) {
      const NothingInstagramImg = <InstagramImg instagramPost="該当するデータがありません。" />;
      return NothingInstagramImg;
    } else {
      const InstagramImgs = <Slide instagramPosts={item} />
      return InstagramImgs;
    };
  };

  // インスタグラムの埋め込みコードのロード状態を受け渡す。
  const LoadingPost = () => {
    const LoadImg = <InstagramImg loaded={loaded} />;
    return LoadImg;
  };

  return (
    <>
      <Header />
      <ItemContainerDiv>
        <ItemDisplayDiv>
          <SelectItemDiv>
            {loaded ?
              showItem() :
              <ItemInfo loaded={loaded} />
            }
          </SelectItemDiv>
          <SelectRelateItemDiv>
            {loaded ?
              showInstagramPost() : LoadingPost()
            }
          </SelectRelateItemDiv>
        </ItemDisplayDiv>
      </ItemContainerDiv>
    </>
  );
};


const ItemContainerDiv = styled.div`
  width: 100%;
  padding: 120px 0px 30px 0px;
  background-color: #F6F6F6;
`;

const ItemDisplayDiv = styled.div`
  width: 100%;
`;

const SelectItemDiv = styled.div`
  width: 100%;
  justify-content: center;

  ${lg`
    display: flex;
    height: 400px;
    margin: 10px;
  `}

  ${pc`
    display: flex;
    height: 400px;
    margin: 10px;
  `}
`;

const SelectRelateItemDiv = styled.div`
  display: flex;
  padding: 20px 30px;
  margin: 20px 30px;
  background-color: white;
  border-radius: 10px;
`;


export default Item;
