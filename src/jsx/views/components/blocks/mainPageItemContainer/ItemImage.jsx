import styled from "styled-components";


function ItemImage(props) {
  // ItemContainerからアイテム画像URLを受け取る。
  const { itemUrl } = props;

  return (
    <ItemsImage>
      <Img src={itemUrl} />
    </ItemsImage>
  );
};


const ItemsImage = styled.div`
  width: 95%;
  height: 65%;
  margin-top: 5px;
  margin-right: auto;
  margin-left: auto;
  border: 2px solid red;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;


export default ItemImage;