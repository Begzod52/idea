import React from 'react';
import { useProducts } from '../context/ProductContext';
import { useNavigate, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductSlider from '../components/ProductSlider';
import Footer from '../components/Footer';
import ChatBubbleRight from '../components/ChatBubbleRight';
import { useTranslation } from 'react-i18next';

export default function Favorites() {
  const { favorites, clearFavorites, addToCart } = useProducts();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClear = () => {
    if (window.confirm(t('favorites.clear_confirm'))) {
      clearFavorites();
    }
  };

  const handleMoveToCart = () => {
    favorites.forEach(item => addToCart(item));
    clearFavorites();
    navigate('/shop');
  };

  return (
    <div className="bg-gray-100">
      <div className="px-[5%] py-8">
        <div className="text-sm breadcrumbs mb-4">
          <ul>
            <li><Link to="/">{t('common1.home_breadcrumb')}</Link></li>
            <li>{t('favorites.breadcrumb')}</li>
          </ul>
        </div>

        <div className="flex flex-row gap-8 items-start">
          <div className="w-full lg:w-3/4">
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {favorites.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl shadow">
                <h2 className="text-2xl font-bold mb-2">{t('favorites.empty_title')}</h2>
                <p className="text-gray-600 mb-6">{t('favorites.empty_subtitle')}</p>
                <button onClick={() => navigate('/')} className="bg-pink-600 text-white cursor-pointer font-bold py-3 px-6 rounded-lg hover:bg-pink-700">
                  {t('favorites.go_to_home')}
                </button>
              </div>
            )}
          </div>

          {favorites.length > 0 && (
            <aside className="w-full lg:w-1/4 p-6 bg-white rounded-2xl shadow-lg sticky top-32">
              <h3 className="text-xl font-bold mb-4">{t('favorites.aside_title')}</h3>
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">{t('favorites.product_count')}</span>
                <span className="font-bold">{favorites.length}</span>
              </div>
              <div className="flex flex-col gap-3">
                 <button 
                   onClick={handleMoveToCart}
                   className="w-full bg-pink-600 text-white font-bold py-3 px-4 rounded-lg cursor-pointer hover:bg-pink-700 transition-colors"
                 >
                   {t('favorites.move_to_cart')}
                 </button>
                 <button 
                   onClick={handleClear}
                   className="w-full bg-gray-200 text-black font-bold cursor-pointer py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                 >
                   {t('favorites.clear_all')}
                 </button>
              </div>
            </aside>
          )}
        </div>
      </div>
      <ProductSlider />
      <Footer />
      <ChatBubbleRight />
    </div>
  );
}