const {promisify} = require('util')
const fs = require('fs')
const {resolve} = require('path')
const mv = promisify(fs.rename)
const { execSync } = require("child_process")

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   

const deleteServerPublic = (path) => {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach((file, index) => {
        const curPath = resolve(path, file);
        if (fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteServerPublic(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  };

const movePublicBuilded = async () => {

  const original = resolve(__dirname, 'web', 'build')
  const target = resolve(__dirname, 'server', 'public')
  await mv(original, target)

}

const execAll = async () => {
  const publicPath = resolve(__dirname, "server", "public");
  
  console.log("🔨 Building a web application")
  execSync("yarn --cwd ./web build")
  console.log("💎 Builded!")
  console.log("⚠️ Removing public folder...")
  deleteServerPublic(publicPath)
  console.log("⚔️ Removed!")
  console.log("💞 Moving web application builded to public in server...")
  await movePublicBuilded()
  console.log("😎 Moved!")
  console.log("💖 Building server!")
  execSync("yarn --cwd ./server build")
  console.log("🚀 Build finished!")
}

execAll()