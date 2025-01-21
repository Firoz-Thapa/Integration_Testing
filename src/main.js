const express = require('express');
const app = express();
const port = 3001;
const converter = require('./converter.js');

app.get('/', (req, res) => res.send("Hello World"));

app.get('/hex-to-rgb', (req, res) => {
    const hexColor = req.query.hex;

    if (!hexColor) {
        return res.status(400).json({ error: 'Hex color missing in the query parameters' });
    }

    const rgbColor = converter.hexToRgb(hexColor);
    res.json(rgbColor);
});

const isTestEnvironment = process.env.NODE_ENV === 'test';

if (isTestEnvironment) {
    module.exports = app;
}

if (process.env.NODE_ENV === 'test') {
    module.exports = app;
} else {
    app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
}
app.use(express.json());

module.exports = app;