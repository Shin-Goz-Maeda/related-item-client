import styled from "styled-components";

const InstagramImg = (props) => {
  const { instagramEmbedCode } = props;
  console.log(instagramEmbedCode);

  return (
    <InstagramImgContainer
      dangerouslySetInnerHTML={{ __html: instagramEmbedCode}}
    >
    </InstagramImgContainer>
  );
};

const InstagramImgContainer = styled.div`
  width: 100%;
  height: 100%;
`;


export default InstagramImg;