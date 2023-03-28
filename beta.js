const fs = require('fs')

const repo = process.argv[2]
const releases = process.argv.slice(3,)

const pkg = require(`${repo}/package.json`)

const { version } = pkg

const isFirstBetaRelease = () => {
  let isFirstRelease = true
  
  for (const release of releases) {
    if (release.includes(version)) {
      isFirstRelease = false
      break
    }
  }

  return isFirstRelease
}

let beta = null

if (isFirstBetaRelease()) {
  beta = version + '-beta.0'
} else {
  const lastBeta = Number(releases.find(release => release.includes(version)).split('.').pop())
  const newBeta = version + '-beta.' + (lastBeta + 1)

  beta = newBeta
}

pkg.version = beta

fs.writeFileSync(`${repo}/package.json`, JSON.stringify(pkg, pkg, '  '))

console.log(beta)


