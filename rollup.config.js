import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from "rollup-plugin-uglify";
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
  ],

  plugins: [
    typescript({
      clean: true,
      rollupCommonJSResolveHack: true,
      exclude: ['*.d.ts', '**/*.d.ts'],
    }),
    uglify({
      output: {
        comments: "all"
      }
    })
  ]
},{
  input: 'src/index.ts',
  output: [
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
}];