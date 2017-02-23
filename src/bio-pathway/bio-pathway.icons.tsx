// https://github.com/wikipathways/pvjs/tree/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols
let icons = {
    Arc: {
        id: 'arc',
        url: 'https://cdn.rawgit.com/wikipathways/bio-pathway/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/arc.svg'
    },
    Brace: {
        id: 'brace',
        url: 'https://cdn.rawgit.com/wikipathways/bio-pathway/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/brace.svg'
    },
    EndoplasmicReticulum: {
        id: 'endoplasmic-reticulum',
        url: 'https://cdn.rawgit.com/wikipathways/bio-pathway/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/endoplasmic-reticulum.svg'
    },
    Hexagon: {
        id: 'hexagon',
        url: 'https://cdn.rawgit.com/wikipathways/bio-pathway/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/hexagon.svg'
    },
    GolgiApparatus: {
        id: 'golgi-apparatus',
        url: 'https://cdn.rawgit.com/wikipathways/bio-pathway/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/golgi-apparatus.svg'
    },
    MimDegradation: {
        id: 'mim-degradation',
        url: 'https://cdn.rawgit.com/wikipathways/bio-pathway/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/mim-degradation.svg'
    },
    Mitochondria: {
        id: 'mitochondria',
        url: 'https://cdn.rawgit.com/wikipathways/bio-pathway/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/mitochondria.svg'
    },
    None: {
        id: 'none',
        url: 'https://cdn.rawgit.com/wikipathways/bio-pathway/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/none.svg'
    },
    Oval: {
        id: 'oval',
        url: 'https://cdn.rawgit.com/wikipathways/bio-pathway/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/oval.svg'
    },
    Pentagon: {
        id: 'pentagon',
        url: 'https://cdn.rawgit.com/wikipathways/bio-pathway/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/pentagon.svg'
    },
    Rectangle: {
        id: 'rectangle',
        url: 'https://cdn.rawgit.com/wikipathways/bio-pathway/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/rectangle.svg'
        //url: 'http://clipartist.net/social/clipartist.net/B/base_tux_g_v_linux.svg#layer1',
        //url: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-address-book.svg#Layer_1'
        //url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Aim_Shiny_Icon.svg',
        //url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Aim_Shiny_Icon.svg#svg2',
        //url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Svg_example2.svg',
    },
//	RoundedRectangle: {
//		id: 'svg4333',
//		url: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Black_box.svg#svg4333',
//	},
    Triangle: {
        id: 'triangle',
        url: 'https://cdn.rawgit.com/wikipathways/bio-pathway/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/triangle.svg'
    },
    SarcoplasmicReticulum: {
        id: 'sarcoplasmic-reticulum',
        url: 'https://cdn.rawgit.com/wikipathways/bio-pathway/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/sarcoplasmic-reticulum.svg'
    },
    Silly: {
        id: 'svg2',
        url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Aim_Shiny_Icon.svg',
        //url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Aim_Shiny_Icon.svg#svg2',
        //url: 'http://clipartist.net/social/clipartist.net/B/base_tux_g_v_linux.svg#layer1',
        //url: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-address-book.svg#Layer_1'
        //url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Svg_example2.svg',
    },
} as any;
icons.Circle = icons.Oval;
icons.Complex = icons.Hexagon;
icons.RoundedRectangle = icons.Rectangle;

export default icons;