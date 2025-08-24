import React, { createContext, useContext, useEffect, useState } from 'react';

// Создаем контекст
const ProductContext = createContext(null);

// Хук для удобного доступа к контексту
export const useProducts = () => useContext(ProductContext);

// Функция для получения данных из localStorage
const getInitialState = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key “${key}”:`, error);
    return defaultValue;
  }
};

// Провайдер, который будет "оборачивать" приложение
export function ProductProvider({ children }) {
  const [favorites, setFavorites] = useState(() => getInitialState('favorites', []));
  const [cart, setCart] = useState(() => getInitialState('cart', []));
  const [compare, setCompare] = useState(() => getInitialState('compare', []));

  // Сохранение в localStorage при изменении состояния
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('compare', JSON.stringify(compare));
  }, [compare]);

  // --- Функции для ИЗБРАННОГО ---
  const toggleFavorite = (product) => {
    setFavorites(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (productId) => favorites.some(p => p.id === productId);

  // --- Функции для КОРЗИНЫ ---
  const addToCart = (product) => {
     setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        // Увеличиваем количество, если товар уже в корзине
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      // Добавляем новый товар с количеством 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(p => p.id !== productId));
  };
  
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev => prev.map(p => p.id === productId ? { ...p, quantity } : p));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // --- Функции для СРАВНЕНИЯ ---
  const toggleCompare = (product) => {
    setCompare(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };
  
  const isCompared = (productId) => compare.some(p => p.id === productId);

  const clearCompare = () => {
    setCompare([]);
  };


  const value = {
    favorites,
    cart,
    compare,
    toggleFavorite,
    clearFavorites,
    isFavorite,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleCompare,
    isCompared,
    clearCompare,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}