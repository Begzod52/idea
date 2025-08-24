import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

/**
 * Каталог без затемнения и без скруглений.
 * - ВЕРХНИЙ DIV НЕ МЕНЯЕМ: className="inset-0 z-40 relative" onMouseDown={onOverlayMouseDown}
 * - Каталог фиксирован под шапкой; ширина: от логотипа до правого края (передан через refs)
 * - Слева: прокручиваемый список категорий; по центру: сетка подкатегорий; справа: бренды (6 лого, hover: grayscale→color + тень + рамка)
 * - Клик вне панели закрывает каталог. Внутри панели клики останавливают всплытие.
 */
export default function CatalogMenu({
  open,
  onClose,
  headerRef,
  leftRef,
  rightRef,
}) {
  const { t } = useTranslation();

  // 12 категорий
  const categories = useMemo(
    () => [
      "smartphones",
      "tv_audio_video",
      "appliances",
      "beauty_health",
      "laptops_pc",
      "gadgets_access",
      "auto",
      "tools",
      "kids",
      "cctv",
      "furniture",
      "kitchen",
    ],
    []
  );

  // Бренд-логотипы для правой колонки (png, кроме error.jpg)
  const logosByCategory = {
    smartphones: ["apple", "samsung", "huawei", "xiaomi", "honor", "error"],
    tv_audio_video: ["artel", "samsung", "shivaki", "lg", "xiaomi", "microlab"],
    appliances: ["artel", "samsung", "avalon", "shivaki", "lg", "xiaomi"],
    beauty_health: [
      "artel",
      "avalon",
      "shivaki",
      "xiaomi",
      "panasonic",
      "philips",
    ],
    laptops_pc: ["huawei", "xiaomi", "avtech", "hp", "canon", "tplink"],
    gadgets_access: [
      "samsung",
      "huawei",
      "xiaomi",
      "microlab",
      "panasonic",
      "honor",
    ],
    auto: ["epa", "kenwood", "lg", "microlab", "korona", "artel"],
    tools: ["kingtul", "rockforce", "kenwood", "epa", "microlab", "hp"],
    kids: ["didit", "apple", "samsung", "honor", "xiaomi", "huawei"],
    cctv: ["avtech", "ezviz", "canon", "hp", "lg", "microlab"],
    furniture: ["avalon", "artel", "hausman", "korona", "microlab", "idea"],
    kitchen: ["kenwood", "korona", "artel", "hausman", "microlab", "hp"],
  };

  // Полные подкатегории по всем 12
  const sub = {
    smartphones: {
      columns: [
        {
          title: t("catalog.sub.smartphones.phones"),
          items: [
            "iphone",
            "samsung",
            "huawei",
            "xiaomi",
            "honor",
            "realme",
            "oppo",
            "tecno",
          ].map((k) => t(`catalog.sub.smartphones.items.${k}`)),
        },
        {
          title: t("catalog.sub.smartphones.keypad"),
          items: ["novey", "ajib"].map((k) =>
            t(`catalog.sub.smartphones.keypad_items.${k}`)
          ),
        },
      ],
    },
    tv_audio_video: {
      columns: [
        {
          title: t("catalog.sub.tv.tvs"),
          items: [
            t("catalog.sub.tv.led"),
            t("catalog.sub.tv.oled"),
            t("catalog.sub.tv.qled"),
          ],
        },
        {
          title: t("catalog.sub.tv.tuners"),
          items: [t("catalog.sub.tv.dvb_t2"), t("catalog.sub.tv.smart_boxes")],
        },
        {
          title: t("catalog.sub.tv.audio"),
          items: [t("catalog.sub.tv.soundbars"), t("catalog.sub.tv.speakers")],
        },
      ],
    },
    appliances: {
      columns: [
        {
          title: t("catalog.sub.appliances.climate.title"),
          items: [
            t("catalog.sub.appliances.climate.gas_boilers"),
            t("catalog.sub.appliances.climate.ac"),
            t("catalog.sub.appliances.climate.fans"),
            t("catalog.sub.appliances.climate.purifiers"),
            t("catalog.sub.appliances.climate.humidifiers"),
            t("catalog.sub.appliances.climate.more"),
          ],
        },
        {
          title: t("catalog.sub.appliances.builtin.title"),
          items: [
            t("catalog.sub.appliances.builtin.hoods"),
            t("catalog.sub.appliances.builtin.hobs"),
            t("catalog.sub.appliances.builtin.ovens"),
          ],
        },
        {
          title: t("catalog.sub.appliances.large.title"),
          items: [
            t("catalog.sub.appliances.large.stoves"),
            t("catalog.sub.appliances.large.washers"),
            t("catalog.sub.appliances.large.fridges"),
            t("catalog.sub.appliances.large.freezers"),
          ],
        },
        {
          title: t("catalog.sub.appliances.small_home.title"),
          items: [
            t("catalog.sub.appliances.small_home.vacuums"),
            t("catalog.sub.appliances.small_home.irons"),
            t("catalog.sub.appliances.small_home.sewing"),
            t("catalog.sub.appliances.small_home.scales"),
            t("catalog.sub.appliances.small_home.steamers"),
          ],
        },
        {
          title: t("catalog.sub.appliances.small_kitchen.title"),
          items: [
            t("catalog.sub.appliances.small_kitchen.microwaves"),
            t("catalog.sub.appliances.small_kitchen.mini_ovens"),
            t("catalog.sub.appliances.small_kitchen.blenders"),
            t("catalog.sub.appliances.small_kitchen.coffee"),
            t("catalog.sub.appliances.small_kitchen.processors"),
          ],
        },
      ],
    },
    beauty_health: {
      columns: [
        {
          title: t("catalog.sub.beauty_health.title"),
          items: [
            "curlers",
            "straighteners",
            "trimmers",
            "dryers",
            "brush_dryers",
            "epilators",
            "shavers",
            "electric_toothbrushes",
          ].map((k) => t(`catalog.sub.beauty_health.items.${k}`)),
        },
      ],
    },
    laptops_pc: {
      columns: [
        {
          title: t("catalog.sub.laptops_pc.title"),
          items: [
            "laptops",
            "routers",
            "bags",
            "computers",
            "monoblocks",
            "components",
            "keyboards",
            "keyboards_mice",
            "mice",
            "monitors",
            "printers",
            "mfp",
            "storage",
            "extenders",
            "flash",
            "hdd",
          ].map((k) => t(`catalog.sub.laptops_pc.items.${k}`)),
        },
      ],
    },
    gadgets_access: {
      columns: [
        {
          title: t("catalog.sub.gadgets_access.title"),
          items: [
            "tablets",
            "smart_watches",
            "fitness_bands",
            "headphones",
            "external_storage",
            "batteries",
            "chargers",
          ].map((k) => t(`catalog.sub.gadgets_access.items.${k}`)),
        },
      ],
    },
    auto: {
      columns: [
        {
          title: t("catalog.sub.auto.electronics"),
          items: [
            t("catalog.sub.auto.media"),
            t("catalog.sub.auto.cameras"),
            t("catalog.sub.auto.nav"),
          ],
        },
        {
          title: t("catalog.sub.auto.accessories"),
          items: [
            t("catalog.sub.auto.holders"),
            t("catalog.sub.auto.chargers"),
            t("catalog.sub.auto.compressors"),
          ],
        },
      ],
    },
    tools: {
      columns: [
        {
          title: t("catalog.sub.tools.power"),
          items: [
            t("catalog.sub.tools.drills"),
            t("catalog.sub.tools.grinders"),
            t("catalog.sub.tools.screwdrivers"),
          ],
        },
        {
          title: t("catalog.sub.tools.hand"),
          items: [
            t("catalog.sub.tools.wrenches"),
            t("catalog.sub.tools.hammers"),
            t("catalog.sub.tools.sockets"),
          ],
        },
        {
          title: t("catalog.sub.tools.measure"),
          items: [
            t("catalog.sub.tools.tape"),
            t("catalog.sub.tools.multimeter"),
          ],
        },
      ],
    },
    kids: {
      columns: [
        {
          title: t("catalog.sub.kids.toys"),
          items: [
            t("catalog.sub.kids.educational"),
            t("catalog.sub.kids.outdoor"),
            t("catalog.sub.kids.plush"),
          ],
        },
        {
          title: t("catalog.sub.kids.care"),
          items: [t("catalog.sub.kids.strollers"), t("catalog.sub.kids.seats")],
        },
      ],
    },
    cctv: {
      columns: [
        {
          title: t("catalog.sub.cctv.cameras"),
          items: [
            t("catalog.sub.cctv.ip"),
            t("catalog.sub.cctv.analog"),
            t("catalog.sub.cctv.ptz"),
          ],
        },
        {
          title: t("catalog.sub.cctv.recording"),
          items: [
            t("catalog.sub.cctv.dvrs"),
            t("catalog.sub.cctv.nvrs"),
            t("catalog.sub.cctv.storage"),
          ],
        },
        {
          title: t("catalog.sub.cctv.accessories"),
          items: [t("catalog.sub.cctv.cables"), t("catalog.sub.cctv.power")],
        },
      ],
    },
    furniture: {
      columns: [
        {
          title: t("catalog.sub.furniture.office"),
          items: [
            t("catalog.sub.furniture.desks"),
            t("catalog.sub.furniture.chairs"),
            t("catalog.sub.furniture.storage"),
          ],
        },
        {
          title: t("catalog.sub.furniture.home"),
          items: [
            t("catalog.sub.furniture.sofas"),
            t("catalog.sub.furniture.tables"),
            t("catalog.sub.furniture.shelving"),
          ],
        },
      ],
    },
    kitchen: {
      columns: [
        {
          title: t("catalog.sub.kitchen.cookware"),
          items: [
            t("catalog.sub.kitchen.pans"),
            t("catalog.sub.kitchen.pots"),
            t("catalog.sub.kitchen.knives"),
          ],
        },
        {
          title: t("catalog.sub.kitchen.tableware"),
          items: [
            t("catalog.sub.kitchen.plates"),
            t("catalog.sub.kitchen.cups"),
            t("catalog.sub.kitchen.cutlery"),
          ],
        },
        {
          title: t("catalog.sub.kitchen.storage"),
          items: [
            t("catalog.sub.kitchen.containers"),
            t("catalog.sub.kitchen.jars"),
          ],
        },
      ],
    },
  };

  const [activeIdx, setActiveIdx] = useState(0);
  const [box, setBox] = useState({ left: 0, width: 0, top: 0, height: 560 });
  const panelRef = useRef(null);

  const measure = () => {
    const l = leftRef?.current?.getBoundingClientRect()?.left ?? 0;
    const r =
      rightRef?.current?.getBoundingClientRect()?.right ?? window.innerWidth;
    const hb = headerRef?.current?.getBoundingClientRect()?.bottom ?? 0;
    const top = hb + 8;
    const width = Math.max(320, r - l);
    const height = window.innerHeight - hb - 8;
    setBox({ left: l, width, top, height: Math.max(420, height) });
  };

  useLayoutEffect(() => {
    measure();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onR = () => measure();
    window.addEventListener("resize", onR);
    window.addEventListener("scroll", onR, { passive: true });
    return () => {
      window.removeEventListener("resize", onR);
      window.removeEventListener("scroll", onR);
    };
  }, [open]);

  if (!open) return null;

  const activeKey = categories[activeIdx];
  const logos = (logosByCategory[activeKey] || []).slice(0, 6);

  return (
    <div className="inset-0 z-40 relative">
      <div className="fixed inset-0" onMouseDown={onClose} />

      <div
        ref={panelRef}
        onMouseDown={(e) => e.stopPropagation()} // Это останавливает закрытие при клике внутри меню
        className="fixed bg-white border border-gray-200 shadow-2xl rounded-2xl"
        style={{
          left: box.left,
          width: box.width,
          top: box.top,
          height: box.height,
        }}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-full">
          <aside className="w-[360px] max-w-[42%] bg-gray-50 overflow-y-auto border-r border-gray-200 rounded-l-2xl">
            <ul>
              {categories.map((key, idx) => {
                const active = idx === activeIdx;
                return (
                  <li key={key}>
                    <button
                      onMouseEnter={() => setActiveIdx(idx)}
                      onClick={() => setActiveIdx(idx)}
                      className={`w-full text-left cursor-pointer px-5 py-3 transition ${
                        active
                          ? "bg-white text-gray-900 font-semibold"
                          : "text-gray-800 hover:bg-white/70"
                      }`}
                    >
                      {t(`catalog.categories.${key}`)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          <section className="flex-1 overflow-y-auto p-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              {t(`catalog.categories.${activeKey}`)}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6">
              {sub[activeKey]?.columns?.map((col, i) => (
                <div key={i}>
                  <div className="font-semibold text-gray-900 mb-4 text-lg">
                    {col.title}
                  </div>
                  <ul className="space-y-3">
                    {col.items.map((name, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          className="text-gray-600 block hover:text-pink-600 transition hover:translate-x-1"
                        >
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <aside className="w-[360px] p-6 bg-gray-50 overflow-y-auto border-l border-gray-200 rounded-r-2xl">
            <div className="grid grid-cols-2 gap-6">
              {logos.map((brand) => {
                const src =
                  brand == "error" ? "/error.jpg" : `/${brand}_logo.png`;
                return (
                  <div
                    key={brand}
                    className="group cursor-pointer flex items-center justify-center h-24 bg-white border border-transparent transition hover:shadow-md hover:border-gray-200 rounded-lg"
                  >
                    <img
                      src={src}
                      alt={brand}
                      className={`max-h-10  object-contain ${
                        brand != "error"
                          ? "grayscale group-hover:grayscale-0"
                          : ""
                      } transition duration-300`}
                      onError={(e) => {
                        e.currentTarget.src = "/error.jpg";
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
