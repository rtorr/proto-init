#!/usr/bin/env node
const ncp = require("ncp").ncp;
const path = require("path");
const { exec } = require("child_process");
const fs = require("fs");

const args = process.argv.slice(2);
const currentPath = process.cwd();
const templatePath = path.join(__dirname, "./../template");

ncp.limit = 16;

function replaceString(file, str, next) {
  fs.readFile(file, "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/proto-init/g, str);

    fs.writeFile(file, result, "utf8", function(err) {
      if (err) return console.log(err);
      next();
    });
  });
}

if (args.length !== 1) {
  console.error("you must provide a path to you new project");
} else {
  const projectPath = `${currentPath}/${args}`;
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
    ncp(templatePath, projectPath, function(err) {
      if (err) {
        return console.error(err);
      }
      replaceString(`${projectPath}/package.json`, `${args}`, () => {
        replaceString(`${projectPath}/README.md`, `${args}`, () => {
          exec(
            `cd ${projectPath} && npm install --save-dev @types/jest @types/jest jest parcel-bundler tslib typescript --silent`,
            () => {
              console.log(`Done creating project ${args}`);
              console.log(`cd ${args}`);
              console.log(`npm run dev`);
            }
          ).stderr.pipe(process.stdout);
        });
      });
    });
  } else {
    console.error(
      "This project or directory already exists. Delete it if you are trying to start fresh"
    );
  }
}
