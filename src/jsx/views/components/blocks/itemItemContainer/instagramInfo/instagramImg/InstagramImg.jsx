import styled from "styled-components";

const InstagramImg = (props) => {
  const { instagramPost, loaded, text } = props;

  return (
    <>
    {loaded ?
      <InstagramImgContainer>ロード中</InstagramImgContainer> :
      <InstagramImgContainer
        dangerouslySetInnerHTML={{ __html: instagramPost}}
      >
      </InstagramImgContainer>
    }
    </>
  );
};

const InstagramImgContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;


export default InstagramImg;