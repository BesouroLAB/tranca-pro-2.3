/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./index.tsx",
        "./App.tsx",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./content/**/*.{md,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                stone: {
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    200: '#e7e5e4',
                    300: '#d6d3d1',
                    400: '#a8a29e',
                    500: '#78716c',
                    600: '#57534e',
                    700: '#44403c',
                    800: '#292524',
                    900: '#1c1917',
                    950: '#0c0a09',
                },
                gold: {
                    400: '#FFD700', // Metallic Gold
                    500: '#F59E0B', // Vibrant Amber/Gold
                    600: '#D97706', // Darker Gold
                    950: '#451a03', // Deep Dark Gold/Bronze
                },
                orange: {
                    50: '#fff7ed',
                    100: '#ffedd5',
                    200: '#fed7aa',
                    300: '#fdba74',
                    400: '#fb923c',
                    500: '#f97316', // Standard vibrant orange
                    600: '#ea580c',
                    700: '#c2410c',
                    950: '#431407',
                }
            },
            fontFamily: {
                sans: ['Jost', 'sans-serif'],
                display: ['Tenor Sans', 'sans-serif'],
            }
        }
    },
    plugins: [],
}
