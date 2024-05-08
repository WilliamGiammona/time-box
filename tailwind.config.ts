import type { Config } from 'tailwindcss';

const config = {
    important: true,
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                dark: '#232A3C',
                medium: '#293245',
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'var(--ring)',
                background: 'var(--background)',

                foreground: 'var(--foreground)',
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)',
                },
                popover: {
                    DEFAULT: 'var(--popover)',
                    foreground: 'var(--popover-foreground)',
                },
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)',
                },
            },

            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                'fade-in-bottom': {
                    '0%': {
                        opacity: '0',
                        transform: 'translate3d(0%, -100%, 0)',
                    },
                    '100%': {
                        opacity: '100%',
                        transform: 'translate3d(0%, 0%, 0)',
                    },
                },
                'spin-decelerate': {
                    '0%': {
                        transform: 'rotate(0deg)  scale(1)',
                        animationTimingFunction: 'ease-in-out',
                    },
                    '25%': {
                        transform: 'scale(1.1)',
                        animationTimingFunction: 'ease-in-out',
                    },
                    '50%': {
                        transform: 'scale(1.1)',
                        animationTimingFunction: 'ease-in-out',
                    },
                    '75%': {
                        transform: 'rotate(0deg) scale(1)',
                        animationTimingFunction: 'ease-in-out',
                    },
                    '100%': {
                        transform: 'rotate(360deg) scale(1)',
                        animationTimingFunction: 'ease-in-out',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in-bottom': 'fade-in-bottom 0.6s ease-out',
                'spin-decelerate': 'spin-decelerate 2s infinite',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
