/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				'pm-primary': '#3a86ff',
				'pm-secondary': '#8338ec',
				'pm-accent': '#ffbe0b',
				'pm-success': '#06d6a0',
				'pm-danger': '#ef476f',
				'pm-bg': '#f8f9fa',
				'pm-surface': '#ffffff',
				'pm-text-primary': '#1a1a1a',
				'pm-text-muted': '#6c757d',
				'pm-border': '#e0e0e0',
			},
		},
	},
	plugins: [],
};
