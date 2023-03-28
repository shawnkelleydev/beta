// get / return all related betas

const repo = process.argv[2]
const version = process.argv[3]
const releases = process.argv.slice(4,)

const betas = Array.from(new Set(releases)).filter(release => release.includes(version) && release !== version)

const bashBetas = betas.reduce((betas, beta) => betas + beta + ' ', '')

console.log(bashBetas)