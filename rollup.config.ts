import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import * as banner from 'bannerjs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

export default [{
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/formatter.min.js',
      format: 'umd',
      name: 'formatter',
      banner: banner.onebanner(),
      sourcemap: true
    },
    {
      file: pkg.unpkg,
      format: 'umd',
      name: 'formatter',
      banner: banner.multibanner(),
      sourcemap: true,
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: 'formatter',
      exports: 'auto',
      banner: banner.multibanner(),
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      name: 'formatter',
      banner: banner.multibanner(),
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    typescript({ tsconfig: './tsconfig.json' }),
    commonjs(),
  ]
}, {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/formatter.min.js',
      format: 'umd',
      name: 'formatter',
      banner: banner.onebanner(),
      sourcemap: true
    },
  ],
  plugins: [
    typescript({ tsconfig: './tsconfig.json' }),
    terser({}),
  ]
}];