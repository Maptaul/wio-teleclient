import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./testimonials.module.scss";

export default function Testimonials() {
  const swiperRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch("/public/testimonials.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error loading testimonials:", err));
  }, []);

  const handleNameClick = (index) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  if (!testimonials.length) return null; // optional loading fallback

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <h2 className={styles.heading}>What Our Customers Say</h2>
        <div className={styles.swipWrap}>
          {/* Left side: Swiper name list */}
          <div className={styles.nameList}>
            <Swiper
              direction="vertical"
              slidesPerView={3}
              spaceBetween={20}
              loop={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              modules={[Autoplay]}
              centeredSlides={true}
              autoHeight={true}
              breakpoints={{
                0: {
                  direction: "horizontal",
                  slidesPerView: 2,
                  centeredSlides: false,
                },
                576: {
                  direction: "vertical",
                  slidesPerView: 3,
                },
                768: {
                  direction: "vertical",
                  slidesPerView: 3,
                },
                1024: {
                  direction: "vertical",
                  slidesPerView: 3,
                },
              }}
            >
              {testimonials.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <div
                    className={`${styles.nameCard} ${
                      index === activeIndex ? styles.active : ""
                    }`}
                    onClick={() => handleNameClick(index)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className={styles.avatar}
                    />
                    <h4>{item.name}</h4>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right side: testimonial content */}
          <div className={styles.testimonialContent}>
            <div className={styles.stars}>
              {"★".repeat(testimonials[activeIndex].stars)}
            </div>
            <p className={styles.text}>{testimonials[activeIndex].content}</p>
            <div className={styles.author}>
              <img
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].name}
              />
              <div>
                <h5>{testimonials[activeIndex].name}</h5>
                <p>{testimonials[activeIndex].occupation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
