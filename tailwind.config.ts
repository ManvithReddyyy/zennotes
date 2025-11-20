import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                charcoal: '#1a1a1a',
            },
            fontFamily: {
                mono: ['var(--font-jetbrains-mono)', 'monospace'],
            },
            boxShadow: {
                soft: '0 2px 8px rgba(0, 0, 0, 0.04)',
                'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.08)',
            },
            borderRadius: {
                DEFAULT: '12px',
            },
        },
    },
    plugins: [],
};

export default config;
