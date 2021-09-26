exports.COMMIT_MSG = `#!/bin/sh

echo -e "\\033[46;37mcommitlint\\033[0m 正在执行ESLint检查..."
eslint -v
if [ ! $? -eq 0 ];then
  echo -e "\\033[46;37mcommitlint\\033[0m \\033[31m未安装ESLint\\033[0m"
else
  eslint --ext .js,.vue src
  if [ ! $? -eq 0 ];then
    echo -e "\\033[46;37mcommitlint\\033[0m \\033[31mESLint检查不通过，请修改后重新提交\\033[0m"
    exit 1
  fi
  echo -e "\\033[46;37mcommitlint\\033[0m 检查完成"
fi

echo -e "\\033[46;37mcommitlint\\033[0m 正在检查提交日志..."
commitlint --edit $1
if [ ! $? -eq 0 ];then
  echo -e "\\033[46;37mcommitlint\\033[0m \\033[31m提交日志不符合规范，请检查后重新提交\\033[0m"
	exit 1
fi
echo -e "\\033[46;37mcommitlint\\033[0m 检查完成"
`
exports.COMMIT_LINT_CONFIG = `module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [2, 'always', ['fix', 'feat', 'docs', 'style', 'refactor', 'test', 'perf', 'chore', 'revert']],
    'header-max-length': [2, 'always', 100]
  }
}
`
const NPM_CLEINT_MAP = {
  YARN: 'yarn',
  CNPM: 'cnpm',
  NPM: 'npm'
}
exports.NPM_CLEINT_MAP = NPM_CLEINT_MAP
exports.NPM_CLEINTS = [
  { name: NPM_CLEINT_MAP.YARN, command: 'add' },
  { name: NPM_CLEINT_MAP.CNPM, command: 'install' },
  { name: NPM_CLEINT_MAP.NPM, command: 'install' },
]
