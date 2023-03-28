// get / return all related betas

const repo = process.argv[2]
const releases = process.argv.slice(3,)

const { version } = require(`${repo}/package.json`)
// const version = '3.5.0'

const betas = Array.from(new Set(releases)).filter(release => release.includes(version) && release !== version)

const bashBetas = betas.reduce((betas, beta) => betas + beta + ' ', '')

console.log(bashBetas)