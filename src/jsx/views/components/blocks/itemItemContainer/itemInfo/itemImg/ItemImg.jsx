import styled from "styled-components";


function ItemImg(props) {
  const { itemImgUrl } = props;

  return (
    <ItemImgContainer>
      <ItemDisplayImg src={itemImgUrl}></ItemDisplayImg>
    </ItemImgContainer>
  );
};


const ItemImgContainer = styled.div`
  width: 50%;
  height: 50%;
  margin: 0 auto;
  border: 1px solid red;
`;

const ItemDisplayImg = styled.img`
  width: 100%;
  height: 100%;
`;


export default ItemImg;