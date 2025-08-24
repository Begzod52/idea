import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

import "swiper/css";
import "swiper/css/navigation";

const ProductSlider3 = () => {
  const { t } = useTranslation();
  const products = [
    {
      id: 44,
      image: "/p44.png",
      price: "2 599 000",
      monthlyPrice: "433 167",
      name: "Tefal",
    },
    {
      id: 45,
      image: "/p45.png",
      price: "299 000",
      monthlyPrice: "49 834",
      name: "Gorenje",
    },
    {
      id: 46,
      image: "/p46.png",
      price: "279 000",
      monthlyPrice: "46 500",
      name: "Gorenje",
    },
    {
      id: 47,
      image: "/p47.png",
      price: "1 590 000",
      monthlyPrice: "265 000",
      name: "Karcher",
    },
    {
      id: 48,
      image: "/p48.png",
      price: "1 399 000",
      monthlyPrice: "233 167",
      name: "Чайка",
    },
    {
      id: 49,
      image: "/p49.png",
      price: "2 399 000",
      monthlyPrice: "399 834",
      name: "Karcher",
    },
    {
      id: 50,
      image: "/p50.png",
      price: "349 000",
      monthlyPrice: "58 167",
      name: "Tefal",
    },
    {
      id: 51,
      image: "/p51.png",
      price: "449 000",
      monthlyPrice: "74 834",
      name: "Tefal",
    },
    {
      id: 52,
      image: "/p52.png",
      price: "549 000",
      monthlyPrice: "91 500",
      name: "Tefal",
    },
    {
      id: 53,
      image: "/p53.png",
      price: "699 000",
      monthlyPrice: "116 500",
      name: "Kleo",
    },
    {
      id: 54,
      image: "/p54.png",
      price: "699 000",
      monthlyPrice: "116 500",
      name: "Kleo",
    },
    {
      id: 55,
      image: "/p55.png",
      price: "359 000",
      monthlyPrice: "59 834",
      name: "Artel",
    },
  ];

  return (
    <div className="bg-gray-100">
      <div className="px-[5%] py-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-medium text-gray-900">
            {t("slider3.title")}
          </h2>
          <button className="text-pink-600 font-medium flex items-center gap-2 cursor-pointer hover:text-pink-800 transition-colors">
            {t("slider3.view_all")} <ChevronRight size={20} />
          </button>
        </div>
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={5}
            navigation={{
              prevEl: ".small-appliances-swiper-button-prev",
              nextEl: ".small-appliances-swiper-button-next",
            }}
            className="!pb-2"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="h-auto pb-2">
                <ProductCard product={product} sliderName="slider3" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="small-appliances-swiper-button-prev absolute top-1/2 -left-10 -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full shadow-lg p-2 hover:border-pink-600 border transition-colors">
            <ChevronLeft className="text-pink-600" size={28} />
          </div>
          <div className="small-appliances-swiper-button-next absolute top-1/2 -right-10 -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full shadow-lg p-2 hover:border-pink-600 border transition-colors">
            <ChevronRight className="text-pink-600" size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider3;
