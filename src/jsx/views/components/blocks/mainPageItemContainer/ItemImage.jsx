import styled from "styled-components";


function ItemImage(props) {
  // ItemContainerからアイテム画像URLを受け取る。
  const { itemUrl } = props;

  return (
    <ItemsImageDiv>
      <ItemImg src={itemUrl} />
    </ItemsImageDiv>
  );
};


const ItemsImageDiv = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 10px;
  background-color: white;
  border-radius: 10px 10px 0 0;
`;

const ItemImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;


export default ItemImage;