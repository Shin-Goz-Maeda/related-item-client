import './Main.css';
import Header from '../Header/Header';
import ItemContainer from './ItemContainer/ItemContainer';

const Main = () => {
  return (
    <>
      <Header />
      <div id='container'>
        <ItemContainer />
      </div>
    </>
  );
}

export default Main;
