import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

import "swiper/css";
import "swiper/css/navigation";

const ProductSlider4 = () => {
  const { t } = useTranslation();
  const products = [
    {
      id: 56,
      image: "/p56.png",
      price: "1 690 000",
      monthlyPrice: "281 667",
      name: "Didit",
    },
    {
      id: 57,
      image: "/p57.png",
      price: "2 090 000",
      monthlyPrice: "348 334",
      name: "Didit",
    },
    {
      id: 58,
      image: "/p58.png",
      price: "2 432 000",
      monthlyPrice: "405 334",
      name: "Didit",
    },
    {
      id: 59,
      image: "/p59.png",
      price: "2 628 000",
      monthlyPrice: "438 000",
      name: "Didit",
    },
    {
      id: 60,
      image: "/p60.png",
      price: "2 631 000",
      monthlyPrice: "438 500",
      name: "Didit",
    },
    {
      id: 61,
      image: "/p61.png",
      price: "2 691 000",
      monthlyPrice: "448 500",
      name: "Didit",
    },
    {
      id: 62,
      image: "/p62.png",
      price: "2 710 000",
      monthlyPrice: "451 667",
      name: "Didit",
    },
    {
      id: 63,
      image: "/p63.png",
      price: "2 890 000",
      monthlyPrice: "481 667",
      name: "Didit",
    },
    {
      id: 64,
      image: "/p64.png",
      price: "2 990 000",
      monthlyPrice: "498 334",
      name: "Didit",
    },
    {
      id: 65,
      image: "/p65.png",
      price: "2 990 000",
      monthlyPrice: "498 334",
      name: "Didit",
    },
    {
      id: 66,
      image: "/p66.png",
      price: "2 990 000",
      monthlyPrice: "498 334",
      name: "Didit",
    },
    {
      id: 67,
      image: "/p67.png",
      price: "3 034 000",
      monthlyPrice: "505 667",
      name: "Didit",
    },
  ];

  return (
    <div className="bg-gray-100">
      <div className="px-[5%] py-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-medium text-gray-900">
            {t("slider4.title")}
          </h2>
          <button className="text-pink-600 font-medium flex items-center gap-2 cursor-pointer hover:text-pink-800 transition-colors">
            {t("slider4.view_all")} <ChevronRight size={20} />
          </button>
        </div>
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={5}
            navigation={{
              prevEl: ".kids-swiper-button-prev",
              nextEl: ".kids-swiper-button-next",
            }}
            className="!pb-2"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="h-auto pb-2">
                <ProductCard product={product} sliderName="slider4" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="kids-swiper-button-prev absolute top-1/2 -left-10 -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full shadow-lg p-2 hover:border-pink-600 border transition-colors">
            <ChevronLeft className="text-pink-600" size={28} />
          </div>
          <div className="kids-swiper-button-next absolute top-1/2 -right-10 -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full shadow-lg p-2 hover:border-pink-600 border transition-colors">
            <ChevronRight className="text-pink-600" size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider4;
