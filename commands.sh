#!/bin/bash

git init
echo -e "node_modules\n.env"> .gitignore

npm init -y
touch .gitignore
touch .README.md

npm i --save-dev mocha chai
npm i --save express

mkdir src
mkdir test

touch src/server.js
touch src/converter.js

touch test/converter.spec.js
touch test/server.spec.js