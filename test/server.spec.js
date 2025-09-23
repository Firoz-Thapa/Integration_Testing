const expect = require("chai").expect;
const axios = require("axios");
const app = require("../src/server.js");
const converter = require("../src/converter.js");
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
            axios.get(url)
                .then(response => {
                    expect(response.status).to.equal(200);
                    done();
                })
                .catch(done);
        });

        it("returns the color in hex", (done) => {
            axios.get(url)
                .then(response => {
                    const rgbColor = converter.hexToRgb("00ff00");
                    expect(response.data).to.deep.equal(rgbColor);
                    done();
                })
                .catch(done);
        });
    });

    after("stop server after tests", (done) => {
        server.close();
        done();
    });
});