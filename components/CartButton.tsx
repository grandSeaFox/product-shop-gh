'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Cart from '@/components/Cart';
import useIsMobile from '@/lib/hooks/useIsMobile';
import { useCart } from '@/lib/providers/CartProvider';

const CartButton = () => {
    const { totalItemsInCart } = useCart();
    const isMobile = useIsMobile();
    const router = useRouter();


    const handleCartClick = () => {
        if (isMobile) {
            router.push('/cart');
        }
    };
    console.log(totalItemsInCart);
    const CartIcon = () => (
        <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            {totalItemsInCart > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItemsInCart}
                </span>
            )}
        </div>
    );

    if (isMobile) {
        return (
            <Button variant="ghost" size="sm" onClick={handleCartClick}>
                <CartIcon />
            </Button>
        );
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                    <CartIcon />
                </Button>
            </SheetTrigger>
            <SheetContent className="min-w-[450px]">
                <Cart />
            </SheetContent>
        </Sheet>
    );
};

export default CartButton;