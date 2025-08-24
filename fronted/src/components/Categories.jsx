import React from "react";
import { useTranslation } from "react-i18next";

const categories = [
  {
    title: "smartphones",
    image: "/iphone.png",
    hoverColor: "hover:bg-pink-500",
  },
  {
    title: "air_conditioners",
    image: "/kondik.png",
    hoverColor: "hover:bg-cyan-400",
  },
  {
    title: "tvs",
    image: "/tv.png",
    hoverColor: "hover:bg-blue-500",
  },
  {
    title: "fridges",
    image: "/fridge.png",
    hoverColor: "hover:bg-gray-400",
  },
  {
    title: "laptops",
    image: "/nout.png",
    hoverColor: "hover:bg-orange-500",
  },
  {
    title: "small_appliances",
    image: "/utyk.png",
    hoverColor: "hover:bg-purple-500",
  },
];

const frequentlySearched = [
  "Кондиционеры 24",
  "Кондиционеры Premier",
  "Электрочайники Philips",
  "Электрочайники Xiaomi",
  "Кондиционеры LG",
  "Кондиционеры Shivaki",
  "Кондиционеры Artel",
  "Кондиционеры Arctic",
  "Кондиционеры 9",
  "Кондиционеры 12",
  "Кондиционеры Hisense",
  "Электрочайники Vitek",
  "Электрочайники Polaris",
  "Машина Xiaomi",
  "Телевизоры LG",
  "Кондиционеры Н723В Artel",
];

const Categories = () => {
  const { t } = useTranslation();
  return (
    <div className="px-[5%] py-12 bg-gray-100">
      <h2 className="text-3xl font-medium text-gray-900 mb-6">
        {t("categories.title")}
      </h2>
      <div className="flex flex-row gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`relative h-65 rounded-2xl p-6 bg-gray-200 group cursor-pointer overflow-hidden transition-colors duration-300 ${category.hoverColor}`}
            >
              <h3 className="text-xl font-semibold text-slate-800 transition-colors duration-300">
                {t(`categories.items.${category.title}`)}
              </h3>

              <img
                src={category.image}
                alt={t(`categories.items.${category.title}`)}
                className="absolute bottom-0 -right-5 w-50 object-contain transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/4 h-135 bg-white rounded-2xl p-6 flex flex-col flex-shrink-0">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {t("categories.people_search_title")}
          </h3>
          <div className="flex-grow overflow-y-auto pr-2">
            <ul className="space-y-3">
              {frequentlySearched.map((item, idx) => (
                <li key={idx}>
                  <button className="block text-gray-700 hover:text-pink-600 font-medium cursor-pointer transition-colors duration-200">
                    {t(`categories.frequently.${idx}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
