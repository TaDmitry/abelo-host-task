'use client';

import React from 'react';

import { Button, Text, Title } from '@ui/index';

import type { Product } from '../../model/types';

import styles from './ProductCard.module.scss';

type Props = {
	product: Product;
	showAddToCart?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, showAddToCart = false }) => {
	return (
		<article className={styles.card}>
			<div className={styles.media}>
				<img
					className={styles.image}
					src={product.thumbnail}
					alt={product.title}
					loading='lazy'
				/>
			</div>

			<div className={styles.body}>
				<Title
					align='Left'
					tag='h5'
					className={styles.title}
				>
					{product.title}
				</Title>
				<Text className={styles.category}>{product.category}</Text>
				<Text className={styles.price}>${product.price}</Text>

				{showAddToCart && (
					<div className={styles.footer}>
						<Button
							type='button'
							className={styles.addBtn}
							text='Add to cart'
							onClick={() => {}}
							aria-label={`Add to cart: ${product.title}`}
						/>
					</div>
				)}
			</div>
		</article>
	);
};
