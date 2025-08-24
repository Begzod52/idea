import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  IoClose,
  IoPaperPlaneOutline,
  IoEllipsisVertical,
  IoAttachOutline,
  IoHappyOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { useTranslation } from "react-i18next";

const ChatWidget = () => {
  const { t, i18n } = useTranslation();
  const tr = (k, d) => t(k, { defaultValue: d });

  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // hover-меню (вверх)
  const [value, setValue] = useState("");

  const toggleChat = () => setIsOpen((v) => !v);

  // демо-сообщения
  const messages = [
    {
      id: 1,
      role: "bot",
      text: tr(
        "chat.operator_greet_multi",
        "Assalomu alaykum! Qanday yordam bera olaman?\nЗдравствуйте, чем могу помочь?"
      ),
      time: "9:50",
    },
  ];

  const quick = useMemo(
    () => [
      tr("chat.quick1", "Assalomu aleykum!"),
      tr("chat.quick2", "Savolim bor edi!"),
      tr("chat.quick3", "Menga yordam bera olasizmi?"),
    ],
    [i18n.language]
  );

  const listRef = useRef(null);
  const scrollToBottom = () => {
    if (listRef.current)
      listRef.current.scrollTop = listRef.current.scrollHeight;
  };
  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [isOpen]);

  // демо: отправка отключена
  const send = (e) => {
    e?.preventDefault?.();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* ОКНО ЧАТА */}
      {isOpen && (
        <div className="bg-white w-80 h-[28rem] rounded-xl shadow-2xl flex flex-col">
          {/* Хедер */}
          <div className="bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-600 p-4 rounded-t-xl flex justify-between items-center text-white relative">
            <button
              onClick={toggleChat}
              className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-white text-gray-800 shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer"
              aria-label={tr("chat.close", "Закрыть")}
              title={tr("chat.close", "Закрыть")}
            >
              <IoClose size={18} />
            </button>

            <div className="flex items-center">
              {/* Аватар с буквой M */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 border-2 border-white bg-white/30 backdrop-blur font-bold">
                M
              </div>
              <div>
                <p className="font-bold">
                  {tr("chat.operator_name", "Madina")}
                </p>
                <p className="text-sm text-white/80">
                  {tr("chat.consultant", "Консультант")}
                </p>
              </div>
            </div>
            <div className="w-6" />
          </div>

          {/* Сообщения */}
          <div ref={listRef} className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((m) => (
              <div key={m.id} className="flex items-start mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 bg-white border-1 border-gray-300">
                  👤
                </div>
                <div className="bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-600 text-white p-3 rounded-xl max-w-[80%] shadow hover:shadow-md transition whitespace-pre-line">
                  <p className="text-sm">{m.text}</p>
                  <p className="text-right text-xs text-white mt-2">{m.time}</p>
                </div>
              </div>
            ))}

            {/* Быстрые ответы — только подставляют в инпут */}
            <div className="flex flex-col items-end mt-4">
              {quick.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setValue(q)}
                  className="bg-white border border-green-500 cursor-pointer text-green-600 px-4 py-2 rounded-full mb-2 text-sm hover:bg-green-500 hover:text-white hover:shadow-md transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Инпут (демо, отправка выключена) */}
          <form
            onSubmit={send}
            className="p-3 border-t border-gray-200 dark:border-gray-400 bg-white rounded-b-xl"
          >
            <div className="flex items-center">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} // блокируем Enter
                placeholder={tr("chat.placeholder_input", "Введите сообщение")}
                className="flex-1 px-4 py-2 rounded-full focus:outline-none bg-gray-200  text-neutral-600 placeholder:text-neutral-400"
              />
              <button
                type="submit"
                disabled
                className="ml-3 text-neutral-400 cursor-not-allowed"
                title={tr("chat.send", "Отправить")}
              >
                <IoPaperPlaneOutline size={24} />
              </button>
            </div>
            <div className="flex items-center mt-2 px-2">
              <button className="text-neutral-500 hover:bg-neutral-300 transition-colors rounded-md p-1 cursor-pointer">
                <IoEllipsisVertical size={22} />
              </button>
              <button className="text-neutral-500 hover:bg-neutral-300 transition-colors rounded-md p-1 cursor-pointer">
                <IoAttachOutline size={22} />
              </button>
              <button className="text-neutral-500 hover:bg-neutral-300 transition-colors rounded-md p-1 cursor-pointer">
                <IoHappyOutline size={22} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ПЛАШКА + МЕНЮ (вверх) */}
      {!isOpen && (
        <div
          className="relative"
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          {/* Меню вверх — остаётся, пока курсор на плашке ИЛИ в меню */}
          <div
            className={`absolute -top-2 right-0 translate-y-[-100%] transition ${
              showMenu
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="w-72 bg-white text-neutral-500 rounded-2xl shadow-2xl border border-gray-300 overflow-hidden">
              <button
                onClick={() =>
                  window.open("https://t.me/ideastore_uz", "_blank")
                }
                className="w-full flex items-center gap-3 hover:bg-gray-200 px-4 py-3 transition cursor-pointer"
                title={tr("chat.telegram", "Телеграм")}
              >
                <span className="w-6 h-6 rounded-full bg-[#229ED9] text-white flex items-center justify-center">
                  <IoPaperPlaneOutline size={16} />
                </span>
                <span className="text-[15px]">
                  {tr("chat.telegram", "Телеграм")}
                </span>
              </button>
              <div className="h-px bg-gray-300 " />
              <button
                onClick={() => setIsOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-200 transition cursor-pointer"
                title={tr("chat.write", "Написать в чат")}
              >
                <span className="w-6 h-6 rounded-full bg-green-500 text-white  flex items-center justify-center">
                  <IoChatbubbleEllipsesOutline size={16} />
                </span>
                <span className="text-[15px]">
                  {tr("chat.write", "Написать в чат")}
                </span>
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="relative text-white font-bold px-15 py-2 rounded-tr-[25px] rounded-tl-[15px]  flex items-center justify-center  mb-[-20px] bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-600  cursor-pointer"
            aria-label={tr("chat.open", "Открыть чат")}
            title={tr("chat.open", "Открыть чат")}
          >
            {tr(
              "chat.need_help",
              i18n.language === "uz" ? "Yordam kerakmi?" : "Нужна помощь?"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
