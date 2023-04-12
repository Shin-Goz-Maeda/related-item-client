import styled from "styled-components";


function InstagramImg(props) {
  // アイテムページからインスタグラム埋め込みコードと画面のロードステータスを受け取る。
  const { instagramPost } = props;

  return (
    <InstagramImgContainerDiv
      dangerouslySetInnerHTML={{ __html: instagramPost }}
    >
    </InstagramImgContainerDiv>
  );
};


const InstagramImgContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;


export default InstagramImg;