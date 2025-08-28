import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import Footer from '../components/Footer';
import ChatBubbleRight from '../components/ChatBubbleRight';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const storeLocations = [
  { position: [41.2995, 69.2401], name: "idea Чиланзар" },
  { position: [41.332, 69.292], name: "idea Нурафшан" },
  { position: [41.280, 69.195], name: "idea Юнусабад" },
  { position: [41.377, 69.289], name: "idea Буюк Ипак Йули" },
  { position: [41.25, 69.22], name: "idea Сергели" },
  { position: [39.654, 66.959], name: "idea Самарканд" },
  { position: [40.783, 72.35], name: "idea Андижан" },
  { position: [40.103, 65.373], name: "idea Навои" },
  { position: [39.764, 64.428], name: "idea Бухара" },
  { position: [40.38, 71.78], name: "idea Фергана" },
  { position: [40.13, 67.84], name: "idea Джизак" },
  { position: [39.05, 66.83], name: "idea Карши" },
  { position: [41.56, 60.63], name: "idea Ургенч" },
  { position: [37.24, 67.28], name: "idea Термез" },
  { position: [42.46, 59.61], name: "idea Нукус" },
];

export default function Shops() {
  const { t } = useTranslation();
  const mapCenter = [41.311081, 69.240562];

  return (
    // Используем div-обертку, чтобы добавить футер
    <div>
      <div className="px-[5%] py-8 bg-gray-50">
        <div className="text-sm breadcrumbs mb-4">
          <ul>
            <li><Link to="/">{t('shops.kocha')}</Link></li>
            <li className='text-3xl font-bold'>{t('shops.uyga')}</li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-4/5 h-[80vh] rounded-2xl overflow-hidden shadow-lg">
            <MapContainer center={mapCenter} zoom={7} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {storeLocations.map((store, idx) => (
                <Marker key={idx} position={store.position}>
                  <Popup>{store.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <aside className="w-full md:w-1/4 p-4 bg-white rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">{t('shops.select_region')}</h3>
            <select className="w-full p-3 mb-5 rounded-lg border bg-slate-100 border-slate-200">
              <option>{t('shops.all_regions')}</option>
            </select>
            <div className="space-y-1 h-[55vh] overflow-y-auto pr-2">
              {storeLocations.map((store, idx) => (
                <div key={idx} className="p-3 rounded-lg cursor-pointer">
                  <p className="font-semibold">{store.name}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
      {/* ДОБАВЛЕННЫЕ КОМПОНЕНТЫ */}
      <Footer />
      <ChatBubbleRight />
    </div>
  );
}