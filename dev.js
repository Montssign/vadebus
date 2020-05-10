const { spawn } = require("child_process")

const server = spawn("yarn", ["--cwd", "server", "dev"])
const serverQueue = spawn("yarn", ["--cwd", "server", "queue"])
const web = spawn("yarn", ["--cwd", "web", "start"])

server.stdout.on("data", (data) => {
  console.log(`Server: ${data}`)
})

server.stderr.on("data", (data) => {
  console.log(`Server error: ${data}`)
})

server.on("close", (data) => {
  console.log(`Server close: ${data}`)
})

serverQueue.stdout.on("data", (data) => {
  console.log(`Server Queue: ${data}`)
})

serverQueue.stderr.on("data", (data) => {
  console.log(`Server Queue error: ${data}`)
})

serverQueue.on("close", (data) => {
  console.log(`Server Queue close: ${data}`)
})

web.stdout.on("data", (data) => {
  console.log(`Web: ${data}`)
})

web.stderr.on("data", (data) => {
  console.log(`Web error: ${data}`)
})

web.on("close", (data) => {
  console.log(`Web close: ${data}`)
})
