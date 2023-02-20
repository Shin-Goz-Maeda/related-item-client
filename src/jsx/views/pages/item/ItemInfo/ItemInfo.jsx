import ItemImg from './ItemImg/ItemImg';
import ItemDetailInformation from './ItemDetailInfomation/ItemDetailInfomation';

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