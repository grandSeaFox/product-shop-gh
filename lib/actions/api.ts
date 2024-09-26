'use server';

import { BASE_API_URL } from '../consts';
import { Category } from '../types/categories';
import { OrderCreated } from '../types/order';
import { Product } from '../types/product';

export async function getProducts(): Promise<Array<Product>> {
  try {
    const response = await fetch(`${BASE_API_URL}/products?norandom`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}

export async function getCategories(): Promise<Array<Category>> {
  try {
    const response = await fetch(`${BASE_API_URL}/categories?norandom`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

export async function createOrder(products: { id: number; quantity: number }[]): Promise<OrderCreated> {
  try {
    const response = await fetch(`${BASE_API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products }),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
}
