import typescript from 'rollup-plugin-typescript2'

/** @type {import('rollup').RollupOptions} */
export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/brainfuck-reader.js',
    format: 'cjs'
  },
  plugins: [typescript()],
  external: ['fs', 'process']
}
