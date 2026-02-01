'use client';

import { useEffect, useMemo, useState } from 'react';

import { BREAKPOINTS } from '@/shared/constants/breakpoints';

type ViewportState = {
	width: number;
	height: number;
};

const SSR_FALLBACK: ViewportState = {
	width: BREAKPOINTS.DESKTOP,
	height: 0,
};

export const useViewport = () => {
	const [vp, setVp] = useState<ViewportState>(SSR_FALLBACK);

	useEffect(() => {
		let raf = 0;

		const update = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				setVp({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			});
		};

		update();
		window.addEventListener('resize', update);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', update);
		};
	}, []);

	return useMemo(() => {
		const { width, height } = vp;

		const isMobile = width <= BREAKPOINTS.MOBILE;
		const isTablet = width > BREAKPOINTS.MOBILE && width <= BREAKPOINTS.TABLET;
		const isDesktop = width > BREAKPOINTS.TABLET;

		return {
			width,
			height,
			isMobile,
			isTablet,
			isDesktop,
		};
	}, [vp]);
};
