const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const child_process = require('child_process')
const ora = require('ora')
const { COMMIT_MSG, COMMIT_LINT_CONFIG } = require('./common')
const getNpmCleint = require('./utils')

const spinner = ora('执行中...').start()
const wirteFile = promisify(fs.writeFile)
const exec = promisify(child_process.exec)

async function install(target = '') {
  const absPath = path.resolve(target)
  try {
    spinner.start('执行项目初始化...')
    await exec('npm init --yes')
    spinner.succeed('项目初始化完成')

    spinner.start('执行git仓库初始化...')
    await exec('git init')
    spinner.succeed('git仓库初始化完成')

    await installDependencies()
    writeCommitMsg()
    writeCommitLintConfig()
  } catch(error) {
    spinner.fail('初始化失败')
    spinner.info(error.message)
  }
}
/**
 * 安装依赖
 * @returns {Promise<void>}
 */
async function installDependencies() {
  const { name, command } = await getNpmCleint()
  spinner.start('安装依赖...')
  const cmd = `${name} ${command} -D @commitlint/cli @commitlint/config-angular`
  await exec(cmd)
  spinner.succeed('依赖安装完成')
}
/**
 * 写入git生命周期commit-msg
 */
function writeCommitMsg() {
  const filePath = path.resolve('.git/hooks/commit-msg')
  spinner.start('写入git生命周期...')
  return wirteFile(filePath, COMMIT_MSG).then(() => {
    spinner.succeed('写入git生命周期commit-msg成功')
  })
}
/**
 * 写入commitlint配置文件
 */
function writeCommitLintConfig() {
  const filePath = path.resolve('commitlint.config.js')
  spinner.start('写入配置文件...')
  return wirteFile(filePath, COMMIT_LINT_CONFIG).then(() => {
    spinner.succeed('写入commitlint配置文件成功')
  })
}
module.exports = install
