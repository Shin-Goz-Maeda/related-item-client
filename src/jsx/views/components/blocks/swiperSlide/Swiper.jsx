import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css";


SwiperCore.use([Virtual, Navigation, Pagination]);


export default function Slide(props) {
  const { instagramPosts } = props;

  const InstagramPostDisplay = () => {
    const InstagramPost = instagramPosts.map((instagramPost, index) => {
      return (
        <SwiperSlide key={index}>
          <SlideDiv
            dangerouslySetInnerHTML={{ __html: instagramPost.instagram_embed_code }}
          >
          </SlideDiv>
        </SwiperSlide>
      );
    });
    return InstagramPost;
  };

  return (
    <>
      <Swiper
        dir="rtl"
        slidesPerView="auto"
        slidesPerGroupAuto
        spaceBetween={40}
        navigation={true}
        pagination={{
          type: "bullets",
          clickable: true
        }}
        loop={true}
        loopAdditionalSlides={4}
        modules={[Pagination]}
      >
        {InstagramPostDisplay()}
      </Swiper>
    </>
  );
};


const SlideDiv = styled.div``;