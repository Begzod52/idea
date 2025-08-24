import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

import "swiper/css";
import "swiper/css/navigation";

const ProductSlider2 = () => {
  const { t } = useTranslation();
  const products = [
    {
      id: 32,
      image: "/p32.png",
      price: "6 999 000",
      monthlyPrice: "1 166 500",
      name: "Indesit",
    },
    {
      id: 33,
      image: "/p33.png",
      price: "5 799 000",
      monthlyPrice: "966 500",
      name: "Goodwell",
    },
    {
      id: 34,
      image: "/p34.png",
      price: "5 590 000",
      monthlyPrice: "931 667",
      name: "Goodwell",
    },
    {
      id: 35,
      image: "/p35.png",
      price: "5 590 000",
      monthlyPrice: "931 667",
      name: "Goodwell",
    },
    {
      id: 36,
      image: "/p36.png",
      price: "4 699 000",
      monthlyPrice: "783 167",
      name: "Kleo",
    },
    {
      id: 37,
      image: "/p37.png",
      price: "12 799 000",
      monthlyPrice: "2 133 167",
      name: "LG",
    },
    {
      id: 38,
      image: "/p38.png",
      price: "2 190 000",
      monthlyPrice: "365 000",
      name: "Artel",
    },
    {
      id: 39,
      image: "/p39.png",
      price: "9 999 000",
      monthlyPrice: "1 666 500",
      name: "TOSHIBA",
    },
    {
      id: 40,
      image: "/p40.png",
      price: "9 299 000",
      monthlyPrice: "1 549 834",
      name: "TOSHIBA",
    },
    {
      id: 41,
      image: "/p41.png",
      price: "4 999 000",
      monthlyPrice: "833 167",
      name: "LG",
    },
    {
      id: 42,
      image: "/p42.png",
      price: "4 999 000",
      monthlyPrice: "833 167",
      name: "LG",
    },
    {
      id: 43,
      image: "/p43.png",
      price: "4 899 000",
      monthlyPrice: "816 500",
      name: "LG",
    },
  ];

  return (
    <div className="bg-gray-100">
      <div className="px-[5%] py-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-medium text-gray-900">
            {t("slider2.title")}
          </h2>
          <button className="text-pink-600 font-medium flex items-center gap-2 cursor-pointer hover:text-pink-800 transition-colors">
            {t("slider2.view_all")} <ChevronRight size={20} />
          </button>
        </div>
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={5}
            navigation={{
              prevEl: ".appliances-swiper-button-prev",
              nextEl: ".appliances-swiper-button-next",
            }}
            className="!pb-2"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="h-auto pb-2">
                <ProductCard product={product} sliderName="slider2" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="appliances-swiper-button-prev absolute top-1/2 -left-10 -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full shadow-lg p-2 hover:border-pink-600 border transition-colors">
            <ChevronLeft className="text-pink-600" size={28} />
          </div>
          <div className="appliances-swiper-button-next absolute top-1/2 -right-10 -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full shadow-lg p-2 hover:border-pink-600 border transition-colors">
            <ChevronRight className="text-pink-600" size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider2;
