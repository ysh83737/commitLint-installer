exports.COMMIT_MSG = `#!/bin/sh
echo -e "\\033[46;37mcommitlint\\033[0m 正在检查提交日志..."
npx commitlint --edit $1
if [ ! $? -eq 0 ];then
  echo -e "\\033[46;37mcommitlint\\033[0m \\033[31m提交日志不符合规范，请检查后重新提交\\033[0m"
	exit 1
fi
echo -e "\\033[46;37mcommitlint\\033[0m 检查完成"
`
exports.COMMIT_LINT_CONFIG = `module.exports = {
  extends: ['@commitlint/config-angular']
}
`
const NPM_CLEINT_MAP = {
  YARN: 'yarn',
  CNPM: 'cnpm',
  NPM: 'npm'
}
exports.NPM_CLEINT_MAP = NPM_CLEINT_MAP
exports.NPM_CLEINTS = [
  { name: 'testcli', command: 'add' },
  { name: NPM_CLEINT_MAP.YARN, command: 'add' },
  { name: NPM_CLEINT_MAP.CNPM, command: 'install' },
  { name: NPM_CLEINT_MAP.NPM, command: 'install' },
]
