const expect = require("chai").expect;
const request = require("request");
const app = require("../src/server.js");
const converter = require("../src/converter.js"); // Import the converter module
const port = 3000;

describe("Color Code Converter API", () => {
    let server = undefined;

    before("Start server before run tests", (done) => {
        server = app.listen(port, () => {
            console.log(`Server listening: localhost:${port}`);
            done();
        });
    });

    describe("Hex to RGB conversion", () => {
        const url = `http://localhost:${port}/hex-to-rgb?hex=00ff00`;

        it("returns status 200", (done) => {
            request(url, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("returns the color in hex", (done) => {
            request(url, (error, response, body) => {

                const rgbColor = converter.hexToRgb("00ff00");


                expect(JSON.parse(body)).to.deep.equal(rgbColor);
                done();
            });
        });
    });

    after("stop server after tests", (done) => {
        server.close();
        done();
    });
});
