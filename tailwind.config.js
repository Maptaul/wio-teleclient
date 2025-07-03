/** @type {import('tailwindcss').Config} */
export default {
        content: [
                "./index.html",
                "./src/**/*.{js,ts,jsx,tsx}",
        ],
        darkMode: 'class',
        theme: {
                extend: {
                        fontFamily: {
                                'exo': ['"Exo"', 'sans-serif'],
                                'sans': ['"Exo"', 'sans-serif'],
                        },
                        colors: {
                                primary: {
                                        50: '#f0f9ff',
                                        100: '#e0f2fe',
                                        200: '#bae6fd',
                                        300: '#7dd3fc',
                                        400: '#38bdf8',
                                        500: '#0ea5e9',
                                        600: '#0284c7',
                                        700: '#0369a1',
                                        800: '#075985',
                                        900: '#0c4a6e',
                                        950: '#082f49',
                                },
                                secondary: {
                                        50: '#fdf4ff',
                                        100: '#fae8ff',
                                        200: '#f5d0fe',
                                        300: '#f0abfc',
                                        400: '#e879f9',
                                        500: '#d946ef',
                                        600: '#c026d3',
                                        700: '#a21caf',
                                        800: '#86198f',
                                        900: '#701a75',
                                        950: '#4a044e',
                                },
                        },
                },
        },
        plugins: [
                function ({ addUtilities }) {
                        const scrollbarUtilities = {
                                '.scrollbar-thin': {
                                        'scrollbar-width': 'thin',
                                },
                                '.scrollbar-thumb-primary-500': {
                                        'scrollbar-color': '#0ea5e9 transparent',
                                },
                                '.scrollbar-track-gray-200': {
                                        'scrollbar-color': '#0ea5e9 #e5e7eb',
                                },
                                '.scrollbar-track-gray-700': {
                                        'scrollbar-color': '#0ea5e9 #374151',
                                },
                                '.scrollbar-thin::-webkit-scrollbar': {
                                        width: '6px',
                                },
                                '.scrollbar-thin::-webkit-scrollbar-track': {
                                        background: 'transparent',
                                },
                                '.scrollbar-thumb-primary-500::-webkit-scrollbar-thumb': {
                                        background: '#0ea5e9',
                                        'border-radius': '3px',
                                },
                                '.scrollbar-thumb-primary-500::-webkit-scrollbar-thumb:hover': {
                                        background: '#0284c7',
                                },
                                '.scrollbar-track-gray-200::-webkit-scrollbar-track': {
                                        background: '#e5e7eb',
                                        'border-radius': '3px',
                                },
                                '.dark .scrollbar-track-gray-700::-webkit-scrollbar-track': {
                                        background: '#374151',
                                        'border-radius': '3px',
                                },
                        };
                        addUtilities(scrollbarUtilities);
                },
        ],
}