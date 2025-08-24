import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronRight, ChevronLeft } from 'lucide-react'; // <-- Импортируем ChevronLeft

// Убедитесь, что стили Swiper импортированы, например, в main.jsx или App.jsx
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Hero = () => {
  // Убедитесь, что эти изображения лежат в папке /public
  const sliderImages = [
    '/slider1.png',
    '/slider2.png',
    '/slider3.png',
    '/slider4.png',
    '/slider5.png',
  ];

  const staticBanners = [
    '/picture1.png',
    '/picture2.png'
  ];

  return (
    <div className="px-[5%] py-8">
      {/* ИЗМЕНЕНИЕ: Задаем высоту всему контейнеру */}
      <div className="flex flex-row gap-6 h-[350px]">
        
        {/* ИЗМЕНЕНИЕ: Слайдер теперь занимает 3/4 ширины */}
        <div className="w-full md:w-2/4 h-full relative group">
           <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              el: '.hero-swiper-pagination',
              clickable: true,
            }}
            // ИЗМЕНЕНИЕ: Добавлена навигация "назад"
            navigation={{
              prevEl: '.hero-swiper-button-prev',
              nextEl: '.hero-swiper-button-next',
            }}
            className="h-full w-full rounded-2xl"
          >
            {sliderImages.map((src, index) => (
              <SwiperSlide key={index}>
                <img src={src} alt={`Promotional slide ${index + 1}`} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Кастомные элементы управления для слайдера */}
          <div className="hero-swiper-pagination absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2"></div>
          
          {/* ИЗМЕНЕНИЕ: Кнопка "назад" */}
          <div className="hero-swiper-button-prev absolute top-1/2 left-5 -translate-y-1/2 z-10 cursor-pointer bg-white/60 rounded-full p-2 hover:bg-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm">
            <ChevronLeft className="text-pink-600" size={32} />
          </div>
          
          <div className="hero-swiper-button-next absolute top-1/2 right-5 -translate-y-1/2 z-10 cursor-pointer bg-white/60 rounded-full p-2 hover:bg-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm">
            <ChevronRight className="text-pink-600" size={32} />
          </div>
        </div>

        {/* ИЗМЕНЕНИЕ: Баннеры теперь в колонке, занимают 1/4 ширины */}
        <div className="flex w-200px gap-6">
            <div className="h-auto w-full">
                 <img src={staticBanners[0]} alt="Side banner 1" className="w-full h-full object-cover rounded-2xl" />
            </div>
             <div className="h-auto w-full">
                 <img src={staticBanners[1]} alt="Side banner 2" className="w-full h-full object-cover rounded-2xl" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;