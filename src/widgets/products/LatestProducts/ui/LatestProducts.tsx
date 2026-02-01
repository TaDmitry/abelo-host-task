'use client';

import React from 'react';

import { useProductsStore } from '@/entities/product';
import { ProductCard } from '@/entities/product/ui';
import { selectIsAuth, useUserStore } from '@/entities/user';
import { Button, Text, Title } from '@ui/index';

import styles from './LatestProducts.module.scss';

const INITIAL_LIMIT = 12;
const LOAD_MORE_LIMIT = 6;

export const LatestProducts: React.FC = () => {
	const isAuth = useUserStore(selectIsAuth);

	const items = useProductsStore((s) => s.items);
	const isLoading = useProductsStore((s) => s.isLoading);
	const error = useProductsStore((s) => s.error);
	const hasMore = useProductsStore((s) => s.hasMore);
	const fetchProducts = useProductsStore((s) => s.fetchProducts);
	const loadMore = useProductsStore((s) => s.loadMore);

	React.useEffect(() => {
		void fetchProducts({ limit: INITIAL_LIMIT, skip: 0 });
	}, [fetchProducts]);

	return (
		<section className={styles.section}>
			<Title
				tag='h2'
				className={styles.title}
			>
				Latest Products
			</Title>

			{isLoading && items.length === 0 && (
				<Text
					className={styles.state}
					role='status'
				>
					Загрузка товаров…
				</Text>
			)}

			{error && items.length === 0 && (
				<div
					className={styles.state}
					role='alert'
				>
					<Text>{error}</Text>
					<Button
						type='button'
						text='Повторить'
						className={styles.retryBtn}
						onClick={() => void fetchProducts({ limit: INITIAL_LIMIT })}
					/>
				</div>
			)}

			<div className={styles.grid}>
				{items.map((p) => (
					<div
						key={p.id}
						className={styles.col}
					>
						<ProductCard
							product={p}
							showAddToCart={isAuth}
						/>
					</div>
				))}
			</div>

			{hasMore && (
				<div className={styles.loadMore}>
					<Button
						type='button'
						className={styles.loadMoreBtn}
						text={isLoading ? 'Loading…' : 'Load more'}
						onClick={() => void loadMore(LOAD_MORE_LIMIT)}
						disabled={isLoading}
					/>
				</div>
			)}
		</section>
	);
};
