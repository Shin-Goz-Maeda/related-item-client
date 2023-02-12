import './ItemInfoContainer.css';

const ItemInfoContainer = () => {
  return (
    <div id='itemInfo' className='itemInfo'>
      <ul>
        <li id='itemName' className='item'>sample</li>
        <li id='itemCategory' className='item'>12,000</li>
        <li id='itemPrice' className='item'>goods</li>
      </ul>
    </div>
  );
};

export default ItemInfoContainer;