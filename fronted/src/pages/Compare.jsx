import React from 'react';
import { useProducts } from '../context/ProductContext';
import { useNavigate, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Plus } from 'lucide-react';
import Footer from '../components/Footer';
import ChatBubbleRight from '../components/ChatBubbleRight';
import ProductSlider4 from '../components/ProductSlider4';
import { useTranslation } from 'react-i18next';

export default function Compare() {
  const { compare, clearCompare } = useProducts();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bg-gray-100">
      <div className="px-[5%] py-8 min-h-screen">
        <div className="text-sm breadcrumbs mb-4">
          <ul>
            <li><Link to="/">{t('common1.home_breadcrumb')}</Link></li>
            <li>{t('compare.breadcrumb')}</li>
          </ul>
        </div>
        
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">{t('compare.title')}</h2>
            {compare.length > 0 && (
                <button onClick={clearCompare} className="bg-gray-200 text-black cursor-pointer transition-colors font-bold py-2 px-4 rounded-lg hover:bg-gray-300">
                    {t('compare.clear_list')}
                </button>
            )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {compare.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}

          <Link to="/" className="flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-2xl h-full min-h-[300px] text-gray-500 hover:border-pink-500 hover:text-pink-500 transition-colors">
            <Plus size={48} />
            <span className="mt-2 font-semibold">{t('compare.add_to_compare')}</span>
          </Link>
        </div>
        
        {compare.length === 0 && (
           <div className="text-center py-20 bg-white rounded-2xl shadow mt-6">
            <h2 className="text-2xl font-bold mb-2">{t('compare.empty_title')}</h2>
            <p className="text-gray-600 mb-6">{t('compare.empty_subtitle')}</p>
            <button onClick={() => navigate('/')} className="bg-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700">
              {t('compare.go_to_shopping')}
            </button>
          </div>
        )}

      </div>

      <ProductSlider4 />
      <Footer />
      <ChatBubbleRight />
    </div>
  );
}