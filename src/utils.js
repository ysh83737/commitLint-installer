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

module.exports = getNpmCleint