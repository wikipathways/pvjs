var autoprefixer = require('autoprefixer');

module.exports = {
    // Disable autoprefixer for now since react-selectize (used in bridgedbjs) has issues with display: box
    // Follow https://github.com/furqanZafar/react-selectize/pull/130
    // TODO: Re-enable when new release or react-selectize (>2.1.0)
    // plugins: [
    //     autoprefixer({
    //         browsers: ['last 3 versions', '> 3%']
    //     })
    // ]
};