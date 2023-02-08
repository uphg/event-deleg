import path from 'path'
import typescript from 'rollup-plugin-typescript2'

const entryFile = 'src/index.ts'

const outputConfigs = {
  umd: {
    name: 'EventDelegation',
    file: 'dist/index.js',
    format: 'umd'
  },
  esm: {
    file: 'dist/index.es.js',
    format: 'es'
  }
}

const tsPlugin = typescript({
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  tsconfigOverride: {
    compilerOptions: {
      sourceMap: false,
      declaration: true,
      declarationMap: false,
      rootDir: './src',
      outDir: 'dist',
      declarationDir: 'types'
    }
  }
})

function createConfig(env) {
  const { ESM = false } = env || {}

  const format = ESM ? 'esm' : 'umd'
  console.log('format')
  console.log(format)

  return {
    input: path.resolve(__dirname, entryFile),
    output: outputConfigs[format],
    plugins: [tsPlugin]
  }
}

export default createConfig(process.env)
