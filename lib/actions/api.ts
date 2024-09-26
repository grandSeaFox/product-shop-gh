'use server';

import { BASE_API_URL } from '../consts';
import { Category } from '../types/categories';
import { Product } from '../types/product';
import { Order } from '@/lib/types/order';

async function handleResponse<T>(response: Response, errorMessage: string): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`${errorMessage}:`, errorText);
    throw new Error(`${errorMessage}: ${response.status} ${response.statusText}`);
  }

  try {
    return await response.json();
  } catch (error) {
    console.error('Failed to parse JSON response:', error);
    throw new Error('Invalid JSON in server response');
  }
}

export async function getProducts(): Promise<Array<Product>> {
  const response = await fetch(`${BASE_API_URL}/products?norandom`, { next: { revalidate: 3600 } });
  return handleResponse<Array<Product>>(response, 'Failed to fetch products');
}

export async function getCategories(): Promise<Array<Category>> {
  const response = await fetch(`${BASE_API_URL}/categories?norandom`, { next: { revalidate: 3600 } });
  return handleResponse<Array<Category>>(response, 'Failed to fetch categories');
}

export async function getOrderById(orderId: number): Promise<Order> {
  const response = await fetch(`${BASE_API_URL}/orders/${orderId}`);
  return handleResponse<Order>(response, 'Failed to fetch order');
}

export async function createOrder(products: { id: number, quantity: number }[]): Promise<Order> {
  const response = await fetch(`${BASE_API_URL}/orders?norandom`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ products }),
  });
  return handleResponse<Order>(response, 'Failed to create order');
}

export async function updateOrder(orderId: number, productId: number, quantity: number): Promise<Order> {
  const response = await fetch(`${BASE_API_URL}/orders/${orderId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'update_quantity', productId, quantity }),
  });
  return handleResponse<Order>(response, 'Failed to update order');
}

export async function completeOrder(orderId: number): Promise<void> {
  const response = await fetch(`${BASE_API_URL}/orders/${orderId}/buy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  await handleResponse<void>(response, 'Failed to complete order');
}