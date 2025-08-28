import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContect.jsx';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { saveAuth } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка регистрации');
      saveAuth(data.token, data.user);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-180 flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl border border-gray-200">
        <h1 className="text-2xl font-extrabold mb-6 text-center">Создать аккаунт</h1>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Имя</label>
            <input className="w-full p-3 rounded-lg bg-slate-100 border-1 border-slate-300"
              value={firstName} onChange={e=>setFirstName(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2">Фамилия</label>
            <input className="w-full p-3 rounded-lg bg-slate-100 border-1 border-slate-300"
              value={lastName} onChange={e=>setLastName(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input className="w-full p-3 rounded-lg bg-slate-100 border-1 border-slate-300"
              value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2">Пароль</label>
            <input type="password" className="w-full p-3 rounded-lg bg-slate-100 border-1 border-slate-300"
              value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold">Зарегистрироваться</button>
        </form>
        <p className="text-center text-sm mt-4">Уже есть аккаунт? <Link to="/login" className="text-red-600">Войти</Link></p>
      </div>
    </div>
  );
}
