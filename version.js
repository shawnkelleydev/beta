const repo = process.argv[2]

const { version } = require(`${repo}/package.json`)

console.log(version)