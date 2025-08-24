import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/navigation";

const ThreeBanner = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState("promo"); 

  const promoBanners = [
    {
      imgSrc: "/slider1.png",
      titleKey: "threeBanner.promos.0.title",
      dateKey: "threeBanner.promos.0.date",
    },
    {
      imgSrc: "/slider3.png",
      titleKey: "threeBanner.promos.1.title",
      dateKey: "threeBanner.promos.1.date",
    },
    {
      imgSrc: "/slider2.png",
      titleKey: "threeBanner.promos.2.title",
      dateKey: "threeBanner.promos.2.date",
    },
  ];

  const videoReviews = [
    {
      imgSrc: "/video1.jpg",
      titleKey: "threeBanner.reviews.0.title",
      descKey: "threeBanner.reviews.0.desc",
    },
    {
      imgSrc: "/video2.jpg",
      titleKey: "threeBanner.reviews.1.title",
      descKey: "threeBanner.reviews.1.desc",
    },
    {
      imgSrc: "/video3.jpg",
      titleKey: "threeBanner.reviews.2.title",
      descKey: "threeBanner.reviews.2.desc",
    },
    {
      imgSrc: "/video4.jpg",
      titleKey: "threeBanner.reviews.3.title",
      descKey: "threeBanner.reviews.3.desc",
    },
    {
      imgSrc: "/video5.jpg",
      titleKey: "threeBanner.reviews.4.title",
      descKey: "threeBanner.reviews.4.desc",
    },
    {
      imgSrc: "/video6.jpg",
      titleKey: "threeBanner.reviews.5.title",
      descKey: "threeBanner.reviews.5.desc",
    },
  ];

  const VideoReviewCard = ({ review }) => (
    <button className="bg-white rounded-2xl p-4 cursor-pointer group block h-full">
      <div className="overflow-hidden rounded-xl mb-4">
        <img
          src={review.imgSrc}
          alt={t(review.titleKey)}
          className="w-full h-auto object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-pink-600">
        {t(review.titleKey)}
      </h3>
      <p className="text-sm text-gray-600">{t(review.descKey)}</p>
    </button>
  );

  return (
    <div className="bg-gray-100 px-[5%] py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          {t("threeBanner.title")}
        </h2>
        <button className="text-pink-600 font-medium relative top-5 flex items-center gap-2 cursor-pointer hover:text-pink-800 transition-colors">
          {t("threeBanner.view_all")} <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setTab("promo")}
          className={`px-6 py-2 rounded-lg font-bold text-base ${
            tab === "promo"
              ? "bg-pink-600 text-white shadow-md cursor-pointer"
              : "bg-white text-gray-700 hover:bg-gray-200 cursor-pointer"
          }`}
        >
          {t("threeBanner.tabs.promo")}
        </button>
        <button
          onClick={() => setTab("connect")}
          className={`px-6 py-2 rounded-lg font-bold text-base ${
            tab === "connect"
              ? "bg-pink-600 text-white shadow-md cursor-pointer"
              : "bg-white text-gray-700 hover:bg-gray-200 cursor-pointer"
          }`}
        >
          {t("threeBanner.tabs.connect")}
        </button>
      </div>

      {tab === "promo" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promoBanners.map((banner, index) => (
            <button
              key={index}
              className="bg-white rounded-2xl p-4 cursor-pointer group block"
            >
              <div className="overflow-hidden rounded-xl mb-4">
                <img
                  src={banner.imgSrc}
                  alt={t(banner.titleKey)}
                  className="w-full h-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1 group-hover:text-pink-600">
                {t(banner.titleKey)}
              </h3>
              {t(banner.dateKey) && (
                <p className="text-sm text-gray-500">{t(banner.dateKey)}</p>
              )}
            </button>
          ))}
        </div>
      )}

      {tab === "connect" && (
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={3}
            slidesPerGroup={1}
            navigation={{
              prevEl: ".video-swiper-button-prev",
              nextEl: ".video-swiper-button-next",
            }}
            className="!pb-2"
          >
            {videoReviews.map((review, index) => (
              <SwiperSlide key={index} className="h-auto pb-2">
                <VideoReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="video-swiper-button-prev absolute top-1/2 -left-10 -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full shadow-lg p-2 hover:border-pink-600 border-white border-1 transition-colors">
            <ChevronLeft className="text-pink-600" size={28} />
          </div>
          <div className="video-swiper-button-next absolute top-1/2 -right-10 -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full shadow-lg p-2 hover:border-pink-600 border-white border-1 transition-colors">
            <ChevronRight className="text-pink-600" size={28} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeBanner;
