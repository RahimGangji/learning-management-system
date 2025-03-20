import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CourseCard from "./CourseCard";
import { useRef } from "react";

const Slider = ({ courses }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  if (!courses || courses.length === 0) {
    return <div className="text-center py-10">No courses available</div>;
  }

  return (
    <div className="relative w-full py-8">
      <div className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2">
        <button
          ref={navigationPrevRef}
          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>
      
      <div className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2">
        <button
          ref={navigationNextRef}
          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={6}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {courses.map((course) => (
          <SwiperSlide key={course._id} className="px-2 py-4">
            <div className="mx-3 flex items-center justify-center">
              <CourseCard course={course} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;