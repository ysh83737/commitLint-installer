#!/usr/bin/env node
const { program } = require('commander')
const { version } = require('./package.json')
const install = require('./src/index')

process.title = 'CommitLintInstaller'

program
  .version(version, '-v, --version', '版本号')
  .option('-t, --target <targetPath>', '目标路径')
  .parse(process.argv)

const options = program.opts()
const { target } = options
install(target)

