import React from 'react';
import { useProducts } from '../context/ProductContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import Footer from '../components/Footer';
import ChatBubbleRight from '../components/ChatBubbleRight';
import ProductSlider2 from '../components/ProductSlider2';
import { useTranslation } from 'react-i18next';

export default function Shop() {
  const { cart, removeFromCart, updateCartQuantity } = useProducts();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/\s/g, '')) * item.quantity, 0);

  return (
    <div className="bg-gray-100">
      <div className="px-[5%] py-8 min-h-screen">
        <div className="text-sm breadcrumbs mb-4">
          <ul>
            <li><Link to="/">{t('common1.home_breadcrumb')}</Link></li>
            <li>{t('cart.breadcrumb')}</li>
          </ul>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-2">{t('cart.empty_title')}</h2>
            <p className="text-gray-600 mb-6">{t('cart.empty_subtitle')}</p>
            <button onClick={() => navigate('/')} className="bg-pink-600 cursor-pointer text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700">
              {t('cart.start_shopping')}
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-2/3 space-y-4">
              {cart.map(product => (
                <div key={product.id} className="flex items-center bg-white p-4 rounded-2xl shadow-md gap-6">
                  <img src={product.image} alt={t(`slider.products.${product.id}.name`)} className="w-24 h-24 object-contain" />
                  <div className="flex-grow">
                    <p className="font-semibold text-lg">{t(`slider.products.${product.id}.name`)}</p>
                    <p className="text-gray-500 text-sm">{t('cart.product_code')} {10000 + product.id}</p>
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button onClick={() => updateCartQuantity(product.id, product.quantity - 1)} className="cursor-pointer px-3 py-2 text-lg">-</button>
                    <span className="px-4 py-2 font-bold">{product.quantity}</span>
                    <button onClick={() => updateCartQuantity(product.id, product.quantity + 1)} className="cursor-pointer px-3 py-2 text-lg">+</button>
                  </div>
                  <div className="text-right w-40">
                    <p className="font-bold text-xl">{product.price} {t('common.sum')}</p>
                  </div>
                  <button onClick={() => removeFromCart(product.id)} className="text-gray-400 cursor-pointer hover:text-red-500">
                    <Trash2 size={24} />
                  </button>
                </div>
              ))}
            </div>

            <aside className="w-full lg:w-1/3 p-6 bg-white rounded-2xl shadow-lg sticky top-32">
              <h3 className="text-2xl font-bold mb-6">{t('cart.aside_title')}</h3>
              <div className="space-y-3 mb-6">
                 {cart.map(p => (
                   <div key={p.id} className="flex justify-between">
                     <span>{t(`slider.products.${p.id}.name`)} ({p.quantity} {t('cart.item_unit')})</span>
                     <span>{(parseFloat(p.price.replace(/\s/g, '')) * p.quantity).toLocaleString()} {t('common.sum')}</span>
                   </div>
                 ))}
                 <hr className="my-3"/>
                 <div className="flex justify-between font-bold text-xl">
                    <span>{t('cart.your_payment')}</span>
                    <span>{total.toLocaleString()} {t('common.sum')}</span>
                 </div>
              </div>
              <button className="w-full bg-pink-600 cursor-pointer text-white font-bold py-3 rounded-lg hover:bg-pink-700 transition-colors text-lg">
                {t('cart.checkout')}
              </button>
            </aside>
          </div>
        )}
      </div>
      <ProductSlider2 />
      <Footer />
      <ChatBubbleRight />
    </div>
  );
}