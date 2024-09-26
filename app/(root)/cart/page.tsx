'use client'

import React from 'react';
import Cart from '@/components/Cart';
import { useCart } from '@/lib/providers/CartProvider';

const CartPage = () => {
  const { isCartOpen, openCart} = useCart();

  if(!isCartOpen) openCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <Cart />
    </div>
  );
};

export default CartPage;