const path = require("path");
const execSync = require("child_process").execSync;

function exec(cmd) {
    execSync(cmd, { stdio: "inherit", env: process.env });
}

let command = "npm run dev";
if (process.argv.length >= 3) {
    command = `${command}:${process.argv[2]}`
}

process.chdir(path.resolve(__dirname, "../admplate"));
exec(command);