import ItemImg from './itemImg/ItemImg';
import ItemDetailInformation from './itemDetailInfomation/ItemDetailInfomation';

const ItemInfo = (props) => {
  const { itemImgUrl, itemName, brand, itemInfo, itemCategory , load} = props;

  return (
    <>
      <ItemImg itemImgUrl={itemImgUrl} />
      {load !== "" ? <ItemDetailInformation
        itemName={itemName}
        brand={brand}
        itemCategory={itemCategory}
        itemInfo={itemInfo}
      /> : <div>{load}</div>}

    </>
  );
};

export default ItemInfo;