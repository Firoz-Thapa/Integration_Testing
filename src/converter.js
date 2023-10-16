/**
 * Converts Hex to RGB values
 * @param {string} hex Hex color code ("ff5733")
 * @returns {object} Object with red, green, and blue values
 */
const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');
    const colorInt = parseInt(hex, 16);
    const [red, green, blue] = [(colorInt >> 16) & 255, (colorInt >> 8) & 255, colorInt & 255];
    

    return { red, green, blue };
};

module.exports = {
    hexToRgb,
};
    

