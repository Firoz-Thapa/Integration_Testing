const expect = require("chai").expect;
const axios = require("axios");
const app = require("../src/server.js");
const converter = require("../src/converter.js");
const port = 3000;

describe("Color Code Converter API", () => {
    let server = undefined;

    before("Start server before run tests", async () => {
        server = await new Promise((resolve) => {
            const s = app.listen(port, () => {
                console.log(`Server listening: localhost:${port}`);
                resolve(s);
            });
        });
    });

    describe("Hex to RGB conversion", () => {
        const url = `http://localhost:${port}/hex-to-rgb?hex=00ff00`;

        it("returns status 200", async () => {
            const response = await axios.get(url);
            expect(response.status).to.equal(200);
        });

        it("returns the color in RGB", async () => {
            const response = await axios.get(url);
            const rgbColor = converter.hexToRgb("00ff00");
            expect(response.data).to.deep.equal(rgbColor);
        });

        it("correctly converts hex to RGB values", async () => {
            const response = await axios.get(url);
            expect(response.data).to.have.property('red', 0);
            expect(response.data).to.have.property('green', 255);
            expect(response.data).to.have.property('blue', 0);
        });

        it("handles black color (000000)", async () => {
            const blackUrl = `http://localhost:${port}/hex-to-rgb?hex=000000`;
            const response = await axios.get(blackUrl);
            expect(response.data).to.have.property('red', 0);
            expect(response.data).to.have.property('green', 0);
            expect(response.data).to.have.property('blue', 0);
        });

        it("handles white color (ffffff)", async () => {
            const whiteUrl = `http://localhost:${port}/hex-to-rgb?hex=ffffff`;
            const response = await axios.get(whiteUrl);
            expect(response.data).to.have.property('red', 255);
            expect(response.data).to.have.property('green', 255);
            expect(response.data).to.have.property('blue', 255);
        });

        it("handles invalid hex code gracefully", async () => {
            const invalidUrl = `http://localhost:${port}/hex-to-rgb?hex=gggggg`;
            try {
                await axios.get(invalidUrl);
            } catch (error) {
                expect(error.response.status).to.be.oneOf([400, 422]);
            }
        });

        it("handles missing hex parameter", async () => {
            const noParamUrl = `http://localhost:${port}/hex-to-rgb`;
            try {
                await axios.get(noParamUrl);
            } catch (error) {
                expect(error.response.status).to.be.oneOf([400, 422]);
            }
        });
    });

    after("stop server after tests", async () => {
        await new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    });
});