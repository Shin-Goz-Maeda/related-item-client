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
        spaceBetween={40}
        navigation={true}
        loop={true}
        loopAdditionalSlides={4}
        modules={[Pagination]}
        pagination={{
          type: "bullets",
          clickable: true
        }}
        breakpoints={{
          375: {slidesPerView: 1},
          768: {slidesPerView: 2},
          1280: {slidesPerView: 3},
          1600: {slidesPerView: 4}
        }}
      >
        {InstagramPostDisplay()}
      </Swiper>
    </>
  );
};


const SlideDiv = styled.div``;