import plugin from 'tailwindcss/plugin';
import colors from 'tailwindcss/colors';
import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/index.html',
		'./src/setup.html',
		'./src/updater.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	plugins: [
		plugin(({ addComponents }) => {
			addComponents({
				'.draggable': {
					'-webkit-app-region': 'drag',
				},
				'.not-draggable': {
					'-webkit-app-region': 'none',
				}
			});
		})
	],
	theme: {
		extend: {
			colors: {
				gray: colors.zinc,
				brand: {
					'50': '#fefbec',
					'100': '#fcf3c9',
					'200': '#f9e68e',
					'300': '#f6d353',
					'400': '#f4bf2a',
					'500': '#eda013',
					'600': '#d27a0d',
					'700': '#ae570f',
					'800': '#8e4312',
					'900': '#753812',
					'950': '#431c05',
				},
			},
			fontFamily: {
				sans: [
					'"Open Sans Variable"',
					'sans-serif'
				],
				serif: [
					'"Blizz Quadrata"',
					'Georgia',
					'"Times New Roman"',
					'serif'
				],
				display: [
					'"Semplicita Pro"',
					'"Open Sans"',
					'Arial',
					'Helvetica',
					'sans-serif'
				],
				system: [
					'system-ui',
					'"Segoe UI"',
					'Roboto',
					'Helvetica',
					'Arial',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
				]
			},
			keyframes: {
				stripedBackgroundAnimation: {
					from: { backgroundPosition: '0 0' },
					to: { backgroundPosition: '80px 0' },
				}
			},
			animation: {
				'striped-bg': 'stripedBackgroundAnimation 10s linear infinite',
			},
		},
	}
} satisfies Config;
