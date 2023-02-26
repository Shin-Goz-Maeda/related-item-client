import ItemImg from './itemImg/ItemImg';
import ItemDetailInformation from './itemDetailInfomation/ItemDetailInfomation';

const ItemInfo = (props) => {
  const { itemImgUrl, itemName, brand, itemInfo, itemCategory } = props;

  return (
    <>
      <ItemImg itemImgUrl={itemImgUrl} />
      <ItemDetailInformation
        itemName={itemName}
        brand={brand}
        itemCategory={itemCategory}
        itemInfo={itemInfo}
      />
    </>
  );
};

export default ItemInfo;