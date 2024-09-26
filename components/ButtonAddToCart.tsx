'use client'

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/providers/CartProvider';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types/product';
import { Minus, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart, updateQuantity, cart } = useCart();
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);

  const existingItem = cart.find(item => item.id === product.id);

  useEffect(() => {
    if (existingItem) {
      setQuantity(existingItem.quantity);
    }
  }, [existingItem]);

  useEffect(() => {
    if(cart.length === 0) {
      setShowQuantitySelector(false);
    }
  }, [cart.length]);

  const handleProductAddToCartClick = (e: React.FormEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault()
    addToCart(product);
    setShowQuantitySelector(true);
  }

  const handleIncrement = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(product.id, 1);
  };

  const handleDecrement = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(product.id, -1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(e.target.value);
    if (isNaN(newQuantity) || newQuantity < 1) newQuantity = 1;
    setQuantity(newQuantity);
    updateQuantity(product.id, newQuantity);
  };

  return (
    <div className="space-y-4 mt-2 flex-grow w-full">
      {!showQuantitySelector? (
        <Button className="py-2 w-full" onClick={(e) => handleProductAddToCartClick(e, product)}>
          Add to Cart
        </Button>
      ) : (
        <div className="flex items-center space-x-2">
          <Button className="px-4 w-full" onClick={(e) => handleDecrement(e)}>
            <Minus/>
          </Button>
          <Input
            type="number" className="text-center w-16 border border-gray-300 rounded"
            value={quantity}
            onChange={(e) => handleQuantityChange(e)}
            min={1}
          />
          <Button className="px-4 w-full" onClick={handleIncrement}>
            <Plus/>
          </Button>
        </div>
      )}
    </div>
  );
};
