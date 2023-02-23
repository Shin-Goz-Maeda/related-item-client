import ItemImg from './itemImg/ItemImg';
import ItemDetailInformation from './itemDetailInfomation/ItemDetailInfomation';

const ItemInfo = (props) => {
  const {  itemPicUrl, itemName, brand, itemInfo, itemCategory } = props;

  return (
    <>
      <ItemImg itemPicUrl={itemPicUrl} />
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