#!/usr/bin/env node
const ncp = require("ncp").ncp;
const path = require("path");
const exec = require("child_process").exec;
const fs = require("fs");

const args = process.argv.slice(2);
const currentPath = process.cwd();
const templatePath = path.join(__dirname, "./../template");

ncp.limit = 16;

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
      exec(
        `cd ${projectPath} && npm install --save-dev @types/jest @types/jest jest parcel-bundler tslib typescript`
      ).stderr.pipe(process.stdout);
    });
  } else {
    console.error(
      "This project or directory already exists. Delete it if you are trying to start fresh"
    );
  }
}
