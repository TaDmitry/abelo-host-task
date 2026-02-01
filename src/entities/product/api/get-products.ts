import { dummyApi } from '@/shared/api/dummyjson';

import type { ProductsResponse } from '../model/types';

const DEFAULT_PRODUCTS_LIMIT = 12;

type Params = {
	limit?: number;
	skip?: number;
};

export const getProducts = async ({ limit = DEFAULT_PRODUCTS_LIMIT, skip = 0 }: Params = {}) => {
	const res = await dummyApi.get<ProductsResponse>('/products', {
		params: { limit, skip },
	});

	return res.data;
};
