// Require child_process module
const { fork } = require("child_process");
const cli = require("npm/bin/npm-cli");

// Run installer
module.exports = function(cwd, args) {
  const installer = fork(cli, args, {
    silent: true,
    cwd: cwd
  });

  // Monitor your installer STDOUT and STDERR
  installer.stdout.on("data", data => {
    console.log(data);
  });
  installer.stderr.on("data", data => {
    console.log(data);
  });

  // Do something on installer exit
  installer.on("exit", code => {
    console.log(`Installer process finished with code ${code}`);
  });
};
