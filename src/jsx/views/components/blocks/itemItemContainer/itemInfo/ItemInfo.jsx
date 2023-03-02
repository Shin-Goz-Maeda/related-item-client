import ItemImg from './itemImg/ItemImg';
import ItemDetailInformation from './itemDetailInfomation/ItemDetailInfomation';

const ItemInfo = (props) => {
  const { itemImgUrl, itemName, brand, itemInfo, itemCategory , loaded} = props;

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