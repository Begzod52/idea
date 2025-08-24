import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

import "swiper/css";
import "swiper/css/navigation";

const ProductSlider1 = () => {
  const { t } = useTranslation();
  const products = [
    {
      id: 1,
      image: `/p1.png`,
      price: "6 999 000",
      monthlyPrice: "1 166 500",
      name: "Indesit",
    },
    {
      id: 2,
      image: `/p2.png`,
      price: "3 588 000",
      monthlyPrice: "598 000",
      name: "Samsung",
    },
    {
      id: 3,
      image: `/p3.png`,
      price: "3 588 000",
      monthlyPrice: "598 000",
      name: "Samsung",
    },
    {
      id: 4,
      image: `/p4.png`,
      price: "4 699 000",
      monthlyPrice: "783 167",
      name: "Honor",
    },
    {
      id: 5,
      image: `/p5.png`,
      price: "2 999 000",
      monthlyPrice: "499 834",
      name: "Honor",
    },
    {
      id: 6,
      image: `/p6.png`,
      price: "2 899 000",
      monthlyPrice: "483 167",
      name: "Loretto",
    },
    {
      id: 7,
      image: `/p7.png`,
      price: "8 299 000",
      monthlyPrice: "1 383 167",
      name: "Iphone",
    },
    {
      id: 8,
      image: `/p8.png`,
      price: "2 699 000",
      monthlyPrice: "449 834",
      name: "Kleo",
    },
    {
      id: 9,
      image: `/p9.png`,
      price: "3 999 000",
      monthlyPrice: "666 500",
      name: "Arctic",
    },
    {
      id: 10,
      image: `/p10.png`,
      price: "6 599 900",
      monthlyPrice: "1 099 984",
      name: "Loretto",
    },
    {
      id: 11,
      image: `/p11.png`,
      price: "1 399 000",
      monthlyPrice: "233 167",
      name: "KONNEN",
    },
    {
      id: 12,
      image: `/p12.png`,
      price: "2 599 000",
      monthlyPrice: "433 167",
      name: "Ferre",
    },
    {
      id: 13,
      image: `/p13.png`,
      price: "2 399 000",
      monthlyPrice: "399 834",
      name: "Honor",
    },
    {
      id: 14,
      image: `/p14.png`,
      price: "2 399 000",
      monthlyPrice: "399 834",
      name: "Xiaomi",
    },
    {
      id: 15,
      image: `/p15.png`,
      price: "3 199 000",
      monthlyPrice: "533 167",
      name: "Honor",
    },
    {
      id: 16,
      image: `/p16.png`,
      price: "3 199 000",
      monthlyPrice: "533 167",
      name: "Honor",
    },
    {
      id: 17,
      image: `/p17.png`,
      price: "5 229 000",
      monthlyPrice: "871 500",
      name: "Samsung",
    },
    {
      id: 18,
      image: `/p18.png`,
      price: "1 899 000",
      monthlyPrice: "316 500",
      name: "Honor",
    },
    {
      id: 19,
      image: `/p19.png`,
      price: "2 699 000",
      monthlyPrice: "449 834",
      name: "Huawei",
    },
  ];

  return (
    <div className="bg-gray-100">
      <div className="px-[5%] py-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-medium text-gray-900">
            {t("slider1.title")}
          </h2>
          <button className="text-pink-600 font-medium flex items-center gap-2 cursor-pointer hover:text-pink-800 transition-colors">
            {t("slider1.view_all")} <ChevronRight size={20} />
          </button>
        </div>
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={5}
            navigation={{
              prevEl: ".product-swiper-button-prev-1",
              nextEl: ".product-swiper-button-next-1",
            }}
            className="!pb-2"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="h-auto pb-2">
                <ProductCard product={product} sliderName="slider1" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="product-swiper-button-prev-1 absolute top-1/2 -left-10 -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full shadow-lg p-2 hover:border-pink-600 border transition-colors">
            <ChevronLeft className="text-pink-600" size={28} />
          </div>
          <div className="product-swiper-button-next-1 absolute top-1/2 -right-10 -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full shadow-lg p-2 hover:border-pink-600 border transition-colors">
            <ChevronRight className="text-pink-600" size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider1;
