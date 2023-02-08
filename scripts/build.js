const path = require('path')
const execa = require('execa')
const fs = require('fs-extra')

const distDir = path.resolve(__dirname, '../dist')

run()

async function run() {
  await execa('tsc')
  if (fs.existsSync(distDir)) {
    await fs.remove(distDir)
  }
  await execa('rollup', ['-c', '--environment', 'ESM'])
  await execa('rollup', ['-c'])
  await execa('eslint', ['dist', '--fix'])
}
