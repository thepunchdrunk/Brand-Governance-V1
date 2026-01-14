/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                brand: {
                    base: '#F4F4F5',    // Zinc 100 - Main Background
                    surface: '#FFFFFF', // Pure White - Cards/Panels
                    primary: '#E2000F', // Brand Red
                    secondary: '#475569', // Slate 600
                    accent: '#F43F5E',  // Rose 500 - Vibrant Accent
                    success: '#10B981', // Emerald 500
                    warning: '#F59E0B', // Amber 500
                    danger: '#E2000F',  // Brand Red
                    text: {
                        main: '#18181B', // Zinc 900
                        muted: '#71717A', // Zinc 500
                        light: '#A1A1AA', // Zinc 400
                    },
                    border: '#E4E4E5',  // Zinc 200
                }
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #E2000F 0%, #FF4D4D 100%)',
                'gradient-surface': 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
                'glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.30) 100%)',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                'glass-hover': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                'glow': '0 0 20px rgba(226, 0, 15, 0.3)',
            },
            animation: {
                'blob': 'blob 7s infinite',
                'marquee': 'marquee 30s linear infinite',
                'spotlight': 'spotlight 2s ease .75s 1 forwards',
                'shimmer': 'shimmer 2s linear infinite',
                'meteor': 'meteor 5s linear infinite',
                'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'scale-in': 'scaleIn 0.3s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                spotlight: {
                    '0%': { opacity: 0, transform: 'translate(-72%, -62%) scale(0.5)' },
                    '100%': { opacity: 1, transform: 'translate(-50%,-40%) scale(1)' },
                },
                shimmer: {
                    from: { backgroundPosition: '0 0' },
                    to: { backgroundPosition: '-200% 0' },
                },
                meteor: {
                    '0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
                    '70%': { opacity: 1 },
                    '100%': { transform: 'rotate(215deg) translateX(-500px)', opacity: 0 },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
}
