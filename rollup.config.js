import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import banner from 'bannerjs';

import pkg from './package.json';

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
    resolve(),
    typescript({
      clean: true,
      rollupCommonJSResolveHack: true,
      exclude: ['*.d.ts', '**/*.d.ts'],
    }),
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
    typescript({
      clean: true,
      rollupCommonJSResolveHack: true,
      exclude: ['*.d.ts', '**/*.d.ts'],
    }),
    terser({}),
  ]
}];