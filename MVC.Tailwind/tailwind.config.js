const colors = require('tailwindcss/colors')
module.exports = {
    mode: 'jit',
    content: [
        './Views/**/*.cshtml'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                cyan: colors.cyan
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('tailwindcss-textshadow')
    ]
}