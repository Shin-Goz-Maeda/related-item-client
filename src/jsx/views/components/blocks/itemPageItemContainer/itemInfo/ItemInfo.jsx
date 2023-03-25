import ItemImg from "../itemInfo/ItemImg"
import ItemDetailInformation from "../itemInfo/ItemDetailInfomation";


function ItemInfo(props) {
  // アイテムページからアイテム情報を受け取る。
  const { itemImgUrl, itemName, brand, itemInfo, itemCategory, loaded } = props;

  return (
    <>
      <ItemImg itemImgUrl={itemImgUrl} />
      {loaded ?
        <div>ロード中</div> :
        <ItemDetailInformation
          itemName={itemName}
          brand={brand}
          itemCategory={itemCategory}
          itemInfo={itemInfo}
        />
      }
    </>
  );
};


export default ItemInfo;