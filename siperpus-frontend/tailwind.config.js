// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
// darkMode: konfigurasi dark mode menggunakan class CSS
darkMode: ['class'],
// content: path ke semua file yang menggunakan class Tailwind
// Tailwind akan scan file ini untuk menentukan class mana yang perlu digenerate
content: [
'./index.html',
'./src/**/*.{vue,js,ts,jsx,tsx}',
],

theme: {
	extend: {
		colors: {
			border: 'var(--border)',
    		background: 'var(--background)',
    		primary: 'var(--primary)',
			primary: {
				DEFAULT: 'var(--primary)',
				foreground: 'var(--primary-foreground)'
			},
			secondary: {
				DEFAULT: 'var(--secondary)',
				foreground: 'var(--secondary-foreground)'
			},
			destructive: {
				DEFAULT: 'var(--destructive))',
				foreground: 'var(--destructive-foreground)'
			},
			muted: {
				DEFAULT: 'var(--muted)',
				foreground: 'var(--muted-foreground)'
			},
			accent: {
				DEFAULT: 'var(--accent)',
				foreground: 'var(--accent-foreground)'
			},
			popover: {
				DEFAULT: 'var(--popover)',
				foreground: 'var(--popover-foreground)'
			},
			card: {
				DEFAULT: 'var(--card)',
				foreground: 'var(--card-foreground)'
			},
			chart: {
				'1': 'var(--chart-1)',
				'2': 'var(--chart-2)',
				'3': 'var(--chart-3)',
				'4': 'var(--chart-4)',
				'5': 'var(--chart-5)'
			}
		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		}
	}
},
plugins: [require("tailwindcss-animate")],
}

