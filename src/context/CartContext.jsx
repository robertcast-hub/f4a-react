// src/context/CartContext.jsx
// Estado global del carrito. Se persiste en localStorage para no perderlo al recargar.
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { storage, KEYS } from '../data/storage';
import { precioFinal } from '../data/dataService';

const CART_KEY = KEYS.cart;
const CartContext = createContext(null);

export const CartProvider = ({ children, initialCart }) => {
  const [cart, setCart] = useState(() => initialCart ?? storage.read(CART_KEY, []));

  useEffect(() => {
    storage.write(CART_KEY, cart);
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Inmutable: se crea un objeto nuevo en vez de mutar el existente
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock ?? Infinity) }
            : item,
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const clearCart = () => setCart([]);

  // Valores derivados: se recalculan solo cuando cambia el carrito
  const { total, count } = useMemo(
    () => ({
      total: cart.reduce((acc, item) => acc + precioFinal(item) * item.quantity, 0),
      count: cart.reduce((acc, item) => acc + item.quantity, 0),
    }),
    [cart],
  );

  const value = { cart, addToCart, removeFromCart, updateQuantity, clearCart, total, count };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
};
