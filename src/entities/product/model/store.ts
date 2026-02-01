'use client';

import { create } from 'zustand';

import { getProducts } from '../api/get-products';
import type { Product } from './types';

const DEFAULT_PRODUCTS_LIMIT = 12;

type ProductsState = {
	items: Product[];
	isLoading: boolean;
	error: string | null;
	hasMore: boolean;

	fetchProducts: (params?: { limit?: number; skip?: number }) => Promise<void>;
	loadMore: (limit: number) => Promise<void>;
};

export const useProductsStore = create<ProductsState>((set, get) => ({
	items: [],
	isLoading: false,
	error: null,
	hasMore: true,

	fetchProducts: async ({ limit = DEFAULT_PRODUCTS_LIMIT, skip = 0 } = {}) => {
		set({ isLoading: true, error: null });

		try {
			const data = await getProducts({ limit, skip });

			set({
				items: data.products,
				isLoading: false,
				hasMore: skip + data.products.length < data.total,
			});
		} catch {
			set({
				isLoading: false,
				error: 'Не удалось загрузить товары. Попробуйте позже.',
			});
		}
	},

	loadMore: async (limit) => {
		const { items, isLoading, hasMore } = get();
		if (isLoading || !hasMore) return;

		set({ isLoading: true, error: null });

		try {
			const data = await getProducts({
				limit,
				skip: items.length,
			});

			set({
				items: [...items, ...data.products],
				isLoading: false,
				hasMore: items.length + data.products.length < data.total,
			});
		} catch {
			set({
				isLoading: false,
				error: 'Не удалось загрузить товары.',
			});
		}
	},
}));
