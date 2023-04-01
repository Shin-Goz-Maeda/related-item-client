import ItemImg from "../itemInfo/ItemImg"
import ItemDetailInformation from "../itemInfo/ItemDetailInfomation";


function ItemInfo(props) {
  // アイテムページからアイテム情報を受け取る。
  const { itemImgUrl, itemName, brand, itemInfo, itemCategory, itemData, loaded } = props;

  const isItem = () => {
    if (itemData !== "該当するデータがありません。") {
      const itemData = <ItemDetailInformation
        itemName={itemName}
        brand={brand}
        itemCategory={itemCategory}
        itemInfo={itemInfo}
      />;
      return itemData;
    } else {
      const NothingItemData = <div>{itemData}</div>;
      return NothingItemData;
    };
  };

  return (
    <>
      <ItemImg itemImgUrl={itemImgUrl} />
      {loaded ?
        <div>ロード中</div> :
        isItem()
      }
    </>
  );
};


export default ItemInfo;