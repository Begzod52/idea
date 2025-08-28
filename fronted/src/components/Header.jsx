import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContect.jsx";
import { useProducts } from "../context/ProductContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import CatalogMenu from "./CatalogMenu.jsx";
import {
  MapPin, Phone, Heart, ShoppingBag, Scale, User, Menu, Search, Percent, ChevronDown, ChevronUp, X
} from "lucide-react";

const Header = () => {
  const logoUrl = "/idea_logo.png";
  const { t, i18n } = useTranslation();
  const { favorites, cart, compare } = useProducts();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(
    i18n.language === "uz" ? "O'zbekcha" : "Русский"
  );
  const langMenuRef = useRef(null);
  const languages = {
    "Русский": "https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg",
    "O'zbekcha": "https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg",
  };

  const [catalogOpen, setCatalogOpen] = useState(false);
  const headerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [headerH, setHeaderH] = useState(0);
  const [elevated, setElevated] = useState(false);

  const handleCatalogToggle = () => setCatalogOpen((prev) => !prev);

  useLayoutEffect(() => {
    const measure = () => setHeaderH(headerRef.current?.offsetHeight || 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (catalogOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [catalogOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setCatalogOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const onChangeLang = (name) => {
    setSelectedLang(name);
    setIsLangOpen(false);
    i18n.changeLanguage(name === "Русский" ? "ru" : "uz");
  };

  return (
    <>
      <div style={{ height: headerH }} />
      {/* ВОТ ИСПРАВЛЕНИЕ: z-50 заменен на z-[1000] */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-shadow ${
          elevated ? "shadow-md" : "shadow-none"
        } bg-white`}
      >
        <div className="flex justify-between items-center py-2.5 px-[5%] bg-gray-100 text-md">
          <div className="flex items-center gap-5">
            <Link to="/sales" className="flex items-center gap-1.5 text-gray-700 font-medium">
              <Percent size={18} className="text-pink-600" /> {t("header.promos")}
            </Link>
            <Link to="/shops" className="flex items-center gap-1.5 text-gray-700 font-medium">
              <MapPin size={18} className="text-pink-600" /> {t("header.stores")}
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:712307799" className="flex items-center gap-1.5 font-semibold text-gray-800">
              <Phone size={18} className="text-pink-600" /> 71 230 77 99
            </a>
            <div className="relative" ref={langMenuRef}>
              <button onClick={() => setIsLangOpen((p) => !p)} className="flex items-center gap-2 cursor-pointer">
                <img src={languages[selectedLang]} alt={`${selectedLang} Flag`} className="w-5 h-5 rounded-full object-cover" />
                <span className="font-medium">{selectedLang}</span>
                {isLangOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-lg p-6 z-20 border border-gray-100">
                  <div className="absolute -top-2 right-6 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-100" />
                  <h3 className="text-xl font-bold mb-6 text-gray-900">{t("header.choose_language")}</h3>
                  <ul className="space-y-5">
                    {Object.entries(languages).map(([name, flagUrl]) => (
                      <li key={name} onClick={() => onChangeLang(name)} className="flex items-center gap-4 cursor-pointer group">
                        <div className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all" style={{ borderColor: selectedLang === name ? "#e83e8c" : "#d1d5db" }}>
                          {selectedLang === name && <div className="w-2.5 h-2.5 bg-[#e83e8c] rounded-full" />}
                        </div>
                        <img src={flagUrl} alt={`${name} Flag`} className="w-7 rounded-sm" />
                        <span className="text-gray-800 group-hover:text-pink-600 font-medium text-base">{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-8 py-5 px-[5%] bg-white">
          <Link to="/" ref={leftRef}>
            <img src={logoUrl} alt="idea logo" className="h-10 flex-shrink-0" />
          </Link>
          <button onClick={handleCatalogToggle} className="relative flex items-center gap-2.5 bg-pink-600 cursor-pointer rounded-lg text-white font-bold text-base py-3 px-5 hover:bg-pink-700 transition-colors">
            <span className="relative inline-block w-5 h-5">
              <Menu size={20} className={`absolute inset-0 transition duration-200 ${catalogOpen ? "opacity-0 scale-50 rotate-90" : "opacity-100"}`} />
              <X size={20} className={`absolute inset-0 transition duration-200 ${catalogOpen ? "opacity-100" : "opacity-0 scale-50 -rotate-90"}`} />
            </span>
            <span>{t("catalog.button")}</span>
          </button>
          <div className="flex items-center flex-grow bg-gray-100 rounded-lg px-4 focus-within:ring-2 focus-within:ring-pink-500">
            <input type="text" placeholder={t("search.placeholder")} className="w-full bg-transparent border-none p-3 text-base focus:outline-none" />
            <Search size={20} className="text-gray-500" />
          </div>
          <ThemeToggle />
          <div className="flex items-center gap-6" ref={rightRef}>
            <Link to="/favorites" className="relative flex flex-col items-center text-xs gap-1 text-gray-600 hover:text-pink-600 font-medium">
              <Heart size={24} />
              {favorites.length > 0 && <span className="absolute top-[-5px] right-[5px] flex items-center justify-center w-[18px] h-[18px] bg-[#fecb3e] text-black text-[11px] rounded-full font-medium border-2 border-white">{favorites.length}</span>}
              {t("header.favorites")}
            </Link>
            <Link to="/shop" className="relative flex flex-col items-center text-xs gap-1 text-gray-600 hover:text-pink-600 font-medium">
              <ShoppingBag size={24} />
              {cart.length > 0 && <span className="absolute top-[-5px] right-[5px] flex items-center justify-center w-[18px] h-[18px] bg-[#fecb3e] text-black font-bold text-[11px] rounded-full border-2 border-white">{cart.length}</span>}
              {t("header.cart")}
            </Link>
            <Link to="/compare" className="relative flex flex-col items-center text-xs gap-1 text-gray-600 hover:text-pink-600 font-medium">
              <Scale size={24} />
              {compare.length > 0 && <span className="absolute top-[-5px] right-[5px] flex items-center justify-center w-[18px] h-[18px] bg-[#fecb3e] text-black font-bold text-[11px] rounded-full border-2 border-white">{compare.length}</span>}
              {t("header.compare")}
            </Link>
            <AuthLoginOrProfile />
          </div>
        </div>
        <CatalogMenu open={catalogOpen} onClose={() => setCatalogOpen(false)} headerRef={headerRef} leftRef={leftRef} rightRef={rightRef} />
      </header>
    </>
  );
};

function AuthLoginOrProfile() {
  const { isAuthed, user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  if (!isAuthed) {
    return (
      <Link
        to="/login"
        className="flex flex-col items-center text-xs gap-1 text-gray-600 hover:text-pink-600 font-medium"
      >
        <User size={24} />
        Войти
      </Link>
    );
  }
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col items-center text-xs gap-1 text-gray-600 hover:text-pink-600 font-medium"
      >
        <User size={24} />
        {user?.firstName?.[0] || "s"}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-lg bg-white border border-gray-200 shadow-lg p-2 z-50">
          <Link
            to="/profile"
            className="block px-3 py-2 rounded-md hover:bg-gray-300 hover:text-black"
          >
            Профиль
          </Link>
          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-300 hover:text-black"
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
