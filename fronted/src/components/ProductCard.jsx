import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, ShoppingBag, Scale } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const ProductCard = ({ product, sliderName = "slider" }) => {
  const { t } = useTranslation();
  const { 
    toggleFavorite, isFavorite, 
    addToCart,
    toggleCompare, isCompared 
  } = useProducts();

  const isLiked = isFavorite(product.id);
  const isComparing = isCompared(product.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
  };
  
  const handleCompareClick = (e) => {
    e.stopPropagation();
    toggleCompare(product);
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col h-full group relative cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button
          onClick={handleCompareClick}
          title="Сравнить"
          className={`transition-colors duration-300 cursor-pointer p-1 rounded-full hover:bg-gray-100 ${
            isComparing ? 'text-pink-600' : 'text-gray-400 hover:text-pink-600'
          }`}
        >
          <Scale size={22} />
        </button>
        <button
          onClick={handleFavoriteClick}
          title="В избранное"
          className={`transition-colors duration-300 cursor-pointer p-1 rounded-full hover:bg-gray-100 ${
            isLiked ? "text-pink-600" : "text-gray-400 hover:text-pink-600"
          }`}
        >
          <Heart size={22} className={isLiked ? "fill-current" : "fill-none"} />
        </button>
      </div>

      <div className="relative mb-4">
        <img
          src={product.image}
          alt={t(`${sliderName}.products.${product.id}.name`, {defaultValue: product.name})}
          className="w-full h-48 object-contain rounded-lg"
        />
        {sliderName === "slider" && (
            <span className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {t("slider.badge_hit")}
            </span>
        )}
      </div>

      <div className="flex-grow flex flex-col">
        <p className="text-2xl font-bold text-pink-600 mb-1">
          {product.price} {t("common.sum")}
        </p>
        <p className="text-xs text-gray-500 mb-2">
          {product.monthlyPrice} {t(`${sliderName}.x6months`)}
        </p>
        <p className="text-sm text-gray-800 font-medium h-10 mb-2">
          {t(`${sliderName}.products.${product.id}.name`, {defaultValue: product.name})}
        </p>
        <p className="text-sm text-gray-500 mt-auto">
          {t("common.brand")}:{" "}
          <a
            href="#"
            onClick={(e) => e.stopPropagation()}
            className="text-gray-800 font-medium underline hover:text-pink-600"
          >
            {product.brand}
          </a>
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={(e) => e.stopPropagation()}
          className="flex-grow bg-gray-100 text-gray-800 hover:bg-pink-600 hover:text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm cursor-pointer"
        >
          {t(`${sliderName}.buy_now`)}
        </button>
        <button
          onClick={handleAddToCartClick}
          className="bg-pink-600 text-white p-2.5 rounded-lg hover:bg-pink-700 transition-colors cursor-pointer"
          aria-label={t(`${sliderName}.add_to_cart`)}
          title={t(`${sliderName}.add_to_cart`)}
        >
          <ShoppingBag size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;