const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

const create = async (projectName) => {
  fs.mkdirSync(path.join('.', projectName));
  process.chdir(path.join('.', projectName));
  console.log(chalk.blue('Initializing project...'));
  execSync(`npm init -y`, {encoding: 'utf8'});
  execSync(`npm install typescript --save-dev`);
  execSync(`npm install @types/node --save-dev`);
  execSync(`npm install --save-dev ts-node nodemon`);
  console.log(chalk.blue('Initializing typescript...'));
  execSync(`npx tsc --init --rootDir src --outDir build \
  --esModuleInterop --resolveJsonModule --lib es6 \
  --module commonjs --allowJs false --noImplicitAny true`);
  execSync(`mkdir src`);
  console.log(chalk.blue('Initializing setting up initial files...'));
  fs.writeFileSync(path.join('.', 'src', 'index.ts'), `console.log('Hello world!');`);
  fs.writeFileSync(path.join('.', 'nodemon.json'), `
    {
      "watch": ["src"],
      "ext": ".ts,.js",
      "ignore": [],
      "exec": "ts-node ./src/index.ts"
    }
  `);
  const package = JSON.parse(fs.readFileSync('package.json'));
  package.scripts = {
    start: 'nodemon',
    build: 'npx tsc',
    prod: 'npm run build && node ./build/index.js'
  };
  fs.writeFileSync(path.join('.', 'package.json'), JSON.stringify(package));
  execSync('npx tsc');
  console.log(chalk.green.bold('Project created successfully!'));
}

module.exports = create;