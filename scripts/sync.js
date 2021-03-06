const fs = require('fs-extra')
const path = require('path')

const files = ['.prettierignore', '.prettierrc', 'tslint.json', '.gitignore', 'LICENSE']

const excludes = ['core']

/**
 * sync config files to each target folder
 * @param {string} package target folder name
 * @param {string[]} files sync files
 */
const syncConfigs = (package, files) => {
  files.forEach(f => {
    fs.copySync(
      path.resolve(__dirname, `../${f}`),
      path.resolve(__dirname, `../packages/${package}/${f}`),
    )
  })
}

/**
 * sync .github folder
 * @param {string} package package in packages folder
 */
const syncGithub = package => {
  fs.copySync(
    path.resolve(__dirname, `../.github`),
    path.resolve(__dirname, `../packages/${package}/.github`),
  )
}

/**
 *
 * @param {string[]} files
 */
const syncTemplate = (package, files = []) => {
  files.forEach(f => {
    fs.copySync(
      path.resolve(__dirname, `../${f}`),
      path.resolve(__dirname, `../packages/${package}/template/${f}.tpl`),
    )
  })
}

fs.readdir(path.resolve(__dirname, '../packages')).then(packages => {
  const _packages = packages.filter(f => {
    return excludes.findIndex(e => e === f) < 0
  })
  _packages.forEach(p => {
    syncConfigs(p, files)
    syncGithub(p)
    syncTemplate(p, files)
  })
})
