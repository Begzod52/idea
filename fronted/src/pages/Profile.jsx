import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContect.jsx";

export default function Profile() {
  const { token, user, logout } = useAuth();
  const [me, setMe] = useState(user);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: "Bearer " + token },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Ошибка запроса");
        setMe(data.user);
      } catch (e) {
        setError(e.message);
      }
    };
    load();
  }, [token]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl border border-gray-200 dark:border-[var(--border)]">
        <h1 className="text-3xl font-extrabold mb-6">Страница профиля</h1>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Имя:</span> {me?.firstName || "—"}
          </p>
          <p>
            <span className="font-semibold">Фамилия:</span>{" "}
            {me?.lastName || "—"}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {me?.email}
          </p>
        </div>
        <p className="text-sm mt-6 opacity-70">
          Это защищенная страница, доступная только авторизованным
          пользователям.
        </p>
        <div className="mt-6">
          <button
            onClick={logout}
            className="bg-gray-300 text-black cursor-pointer px-4 py-2 rounded-lg"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}
