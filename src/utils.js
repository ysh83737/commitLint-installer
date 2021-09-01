const fs = require('fs')
const { promisify } = require('util')
const child_process = require('child_process')
const access = promisify(fs.access)
const exec = promisify(child_process.exec)
const { NPM_CLEINTS } = require('./common')
/**
 * 获取有效的npm客户端yarn/cnpm/npm
 * @returns {Promise<object>}
 */
 async function getNpmCleint() {
  for (let i = 0; i < NPM_CLEINTS.length; i++) {
    const cleint = NPM_CLEINTS[i]
    const bool = await checkCleint(cleint.name)
    if (bool) return cleint
  }
  throw new Error('无有效npm客户端，请安装yarn/cnpm/npm')
}
/**
 * 是否有指定npm客户端
 * @param {string} name npm客户端名称
 * @returns {Promise<boolean>}
 */
function checkCleint(name) {
  const cmd = `${name} -v`
  return exec(cmd).then(({ stdout, stderr }) => {
    if (stdout) return true
    return false
  }).catch(() => {
    return false
  })
}

/**
 * 校验npm是否初始化
 * @returns {Promise<boolean>}
 */
function checkNpmInited() {
  return access('./package.json')
    .then(() => true)
    .catch(() => false)
}
/**
 * 校验git是否初始化
 * @returns {Promise<boolean>}
 */
function checkGitInited() {
  return access('./.git')
    .then(() => true)
    .catch(() => false)
}

module.exports = {
  getNpmCleint,
  checkNpmInited,
  checkGitInited
}