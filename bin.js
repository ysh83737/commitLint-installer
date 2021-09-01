#!/usr/bin/env node
const { program, createCommand } = require('commander')
const { version } = require('./package.json')
const install = require('./src/index')

process.title = 'CommitLintInstaller'

program
  .name('cmli')
  .version(version, '-v, --version', '版本号')

program
  .command('install')
  .description('执行安装')
  .action(install)

program.parse()