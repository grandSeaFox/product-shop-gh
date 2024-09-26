'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from '@/lib/providers/ProductsProvider';
import { useState } from 'react';
import ProductPageSkeleton from '@/components/skeletons/ProductPageSkeleton';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/providers/CartProvider';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/lib/types/product';

export default function ProductsPage() {
    const { groupedProducts, isLoading, error } = useProducts();
    const { addToCart, cart } = useCart();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    if (isLoading) {
        return (
            <ProductPageSkeleton />
        );
    }

    if (error) return <div>Error: {error}</div>;


    // instead of loading everything I would add pagination in all of these

    const categories = Object.keys(groupedProducts);

    const filteredCategories = selectedCategory
        ? [selectedCategory]
        : categories;


    const handleProductAddToCartClick = (e: React.FormEvent<HTMLButtonElement>, product: Product) => {
        e.preventDefault()
        addToCart(product)
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Products by Category</h1>

            <div className="mb-6">
                <Select onValueChange={(value) => setSelectedCategory(value === 'all' ? null : value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {filteredCategories.map((category) => (
                <div key={category} className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">{category}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {groupedProducts[category].map((product) => (
                            <Link href={`/products/${product.id}`} key={product.id}>
                                <Card key={product.id} className="rounded-none shadow-none border-none bg-accent">
                                    <CardHeader>
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={300}
                                            height={300}
                                            placeholder="blur"
                                            blurDataURL="blur"
                                            className="object-cover mb-4 h-64 w-full"
                                        />
                                        <CardTitle className="text-lg">{product.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-500">Price: ${product.price}</p>

                                        <Button
                                            onClick={(e) => handleProductAddToCartClick(e, product)}
                                            className="mt-2 w-full"
                                            disabled={cart.some(item => item.id === product.id)}
                                        >
                                            {cart.some(item => item.id === product.id) ? 'In Cart' : 'Add to Cart'}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            ))
            }
        </div>
    )
}



