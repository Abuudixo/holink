/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#FF4D30', // Vibrant Red-Orange from logo
                    hover: '#E63E24',
                },
                dark: {
                    DEFAULT: '#111827',
                    lighter: '#1F2937',
                }
            }
        },
    },
    plugins: [],
}
