'use server';

import { BASE_API_URL } from '../consts';
import { Category } from '../types/categories';
import { Product } from '../types/product';
import { Order } from '@/lib/types/order';
import { NextError } from 'next/dist/lib/is-error';

export async function getProducts(): Promise<Array<Product>> {
    const response = await fetch(`${BASE_API_URL}/products?norandom`);
    if(!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
}

export async function getCategories(): Promise<Array<Category> | NextError> {
    const response = await fetch(`${BASE_API_URL}/categories?norandom`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
}

export const getOrderById = async (orderId: number): Promise<Order> => {
  const response = await fetch(`${BASE_API_URL}/orders/${orderId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }

  return await response.json();
};

export const createOrder = async (products: { id: number, quantity: number }[]) => {
  const response = await fetch(`${BASE_API_URL}/orders?norandom`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ products }),
  });

  if (!response.ok) throw new Error('Failed to create order');
  return await response.json();
};

export const updateOrder = async (orderId: number, productId: number, quantity: number) => {
  const response = await fetch(`${BASE_API_URL}/orders/${orderId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'update_quantity', productId, quantity }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server error response:', errorText);
    throw new Error(`Failed to update order: ${errorText}`);
  }

  const responseBody = await response.text();

  try {
    return responseBody ? JSON.parse(responseBody) : {};
  } catch (error) {
    console.error('Failed to parse JSON response:', error);
    throw new Error('Invalid JSON in server response');
  }
};

export const completeOrder = async (orderId: number) => {
  const response = await fetch(`${BASE_API_URL}/orders/${orderId}/buy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to complete order');
};
