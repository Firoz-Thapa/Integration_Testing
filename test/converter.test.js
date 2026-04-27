const expect = require("chai").expect;
const converter = require("../src/converter.js");

describe("Color Code Converter", () => {
    describe("Hex to RGB conversion", () => {
        it("should convert the basic colors", () => {
            const redRgb = converter.hexToRgb("ff0000");
            const greenRgb = converter.hexToRgb("00ff00");
            const blueRgb = converter.hexToRgb("0000ff");

            expect(redRgb).to.deep.equal({ red: 255, green: 0, blue: 0 });
            expect(greenRgb).to.deep.equal({ red: 0, green: 255, blue: 0 });
            expect(blueRgb).to.deep.equal({ red: 0, green: 0, blue: 255 });
        });
    });
});
