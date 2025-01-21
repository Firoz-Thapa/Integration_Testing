    #!/bin/bash

    git init
    exho "node_modules"> .gitignore

    npm init -y
    npm i -s express
    npm i --save-dev mocha chai request

    mkdir src
    mkdir test

    touch src/main.js
    touch src/converter.js

    touch test/converter.test.js
    touch test/server.test.js

