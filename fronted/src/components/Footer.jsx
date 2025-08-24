import React from "react";
import { Send, Facebook, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const logoUrl = "/idea_logo.png";
  const devLogoUrl = "/n-logo.png";

  return (
    <footer className="bg-[#2c323f] text-gray-300 font-sans">
      {/* Main Footer Content */}
      <div className="px-[5%] py-12">
        <div className="flex flex-wrap justify-between gap-10">
          {/* Column 1: Logo and Socials */}
          <div className="flex flex-col gap-6">
            <img
              src={logoUrl}
              alt="idea logo"
              className="h-10 w-auto self-start cursor-pointer"
            />
            <button className="flex items-center gap-2 text-gray-300 hover:text-pink-500 cursor-pointer">
              <Send size={18} />
              <span className="text-sm">{t("footer.leave_message")}</span>
            </button>

            <div className="flex items-center gap-3">
              <button className="w-10 h-10 flex items-center justify-center text-gray-300 border border-gray-500 rounded-full hover:border-white hover:text-white transition-colors">
                <Facebook size={20} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-gray-300 border border-gray-500 rounded-full hover:border-white hover:text-white transition-colors">
                <Instagram size={20} />
              </button>
            </div>
          </div>

          {/* Column 2: For Customers */}
          <div>
            <h3 className="font-bold text-white mb-4 text-lg">
              {t("footer.customers")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <button className="hover:text-pink-600 cursor-pointer text-gray-400 transition-colors">
                  {t("footer.faq")}
                </button>
              </li>
              <li>
                <button className="hover:text-pink-600 cursor-pointer text-gray-400 transition-colors">
                  {t("footer.how_to_order")}
                </button>
              </li>
              <li>
                <button className="hover:text-pink-600 cursor-pointer text-gray-400 transition-colors">
                  {t("footer.returns")}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: idea.uz */}
          <div>
            <h3 className="font-bold text-white mb-4 text-lg">
              {t("footer.idea")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <button className="hover:text-pink-600 cursor-pointer text-gray-400 transition-colors">
                  {t("footer.about")}
                </button>
              </li>
              <li>
                <button className="hover:text-pink-600 cursor-pointer text-gray-400 transition-colors">
                  {t("footer.stores")}
                </button>
              </li>
              <li>
                <button className="hover:text-pink-600 cursor-pointer text-gray-400 transition-colors">
                  {t("footer.contacts")}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Information */}
          <div>
            <h3 className="font-bold text-white mb-4 text-lg">
              {t("footer.info")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <button className="hover:text-pink-600 cursor-pointer text-gray-400 transition-colors">
                  {t("footer.articles")}
                </button>
              </li>
              <li>
                <button className="hover:text-pink-600 cursor-pointer text-gray-400 transition-colors">
                  {t("footer.installments")}
                </button>
              </li>
              <li>
                <button className="hover:text-pink-600 cursor-pointer text-gray-400 transition-colors">
                  {t("footer.offer")}
                </button>
              </li>
              <li>
                <button className="hover:text-pink-600 cursor-pointer text-gray-400 transition-colors">
                  {t("footer.vacancies")}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div className="text-right">
            <button className="flex items-center gap-2 hover:text-pink-600 cursor-pointer">
              <Send size={18} />
              <span className="text-sm">{t("footer.leave_message")}</span>
            </button>
            <p className="font-bold text-white text-xl">71 230 77 99</p>
            <p className="text-sm text-gray-400 mb-2">{t("footer.hours")}</p>
            <a
              href="mailto:info@ideagroup.uz"
              className="font-bold text-white text-lg hover:underline"
            >
              info@ideagroup.uz
            </a>
            <p className="text-sm text-gray-400">{t("footer.email")}</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className=" bg-gray-50 text-gray-600 px-[5%] py-4">
        <div className="flex justify-between items-center">
          <p className="text-sm">{t("footer.copyright")}</p>
          <button className="flex items-center gap-2 hover:text-pink-600 cursor-pointer">
            <span className="text-sm font-normal">
              {t("footer.development")}
            </span>
            <img src={devLogoUrl} alt="Developer logo" className="h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
