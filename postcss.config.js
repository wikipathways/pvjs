var autoprefixer = require('autoprefixer');

module.exports = {
    // Autoprefixer e (used in bridgedbjs) has issues with display: box giving warning on build
    // Follow https://github.com/furqanZafar/react-selectize/pull/130
    plugins: [
        autoprefixer({
            browsers: ['last 3 versions', '> 3%']
        })
    ]
};