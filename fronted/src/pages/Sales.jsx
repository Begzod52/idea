import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import ChatBubbleRight from '../components/ChatBubbleRight';

const PromoCard = ({ banner }) => {
  const { t } = useTranslation();
  return (
    <button className="bg-gray-100 rounded-2xl p-4 cursor-pointer group block text-left">
      <div className="overflow-hidden rounded-xl mb-4">
        <img src={banner.imgSrc} alt={t(banner.titleKey)} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <h3 className="text-xl font-semibold mb-1 group-hover:text-pink-600">{t(banner.titleKey)}</h3>
      {t(banner.dateKey) && (<p className="text-sm text-gray-500">{t(banner.dateKey)}</p>)}
    </button>
  );
};

export default function Sales() {
  const { t } = useTranslation();

  const promoBanners = [
    { imgSrc: "/slider1.png", titleKey: "threeBanner.promos.0.title", dateKey: "threeBanner.promos.0.date" },
    { imgSrc: "/slider3.png", titleKey: "threeBanner.promos.1.title", dateKey: "threeBanner.promos.1.date" },
    { imgSrc: "/slider2.png", titleKey: "threeBanner.promos.2.title", dateKey: "threeBanner.promos.2.date" },
  ];

  return (
    // Используем div-обертку, чтобы добавить футер
    <div>
      <div className="px-[5%] py-8 min-h-screen bg-gray-50">
        <div className="text-sm breadcrumbs mb-4">
          <ul>
            <li><Link to="/">{t('sales.kocha')}</Link></li>
          </ul>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">{t("sales.title")}</h2>
          <button className="text-pink-600 font-medium flex items-center gap-2 cursor-pointer hover:text-pink-800 transition-colors">
            {t("sales.view_all")} <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promoBanners.map((banner, index) => (
            <PromoCard key={index} banner={banner} />
          ))}
        </div>
      </div>
      {/* ДОБАВЛЕННЫЕ КОМПОНЕНТЫ */}
      <Footer />
      <ChatBubbleRight />
    </div>
  );
}