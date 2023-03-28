const fs = require('fs')

const repo = process.argv[2]
const pkg = require(`${repo}/package.json`)

let { version } = pkg

version = version.split('-')[0]

pkg.version = version

fs.writeFileSync(`${repo}/package.json`, JSON.stringify(pkg, pkg, '  '))