import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import json from 'rollup-plugin-json';
import scss from 'rollup-plugin-scss';
import replace from 'rollup-plugin-replace';
import re from 'rollup-plugin-re';

const root = path.resolve(__dirname, '..');

export default {
  input: path.resolve(root, 'app', 'src', 'index.js'),
  output: {
    file: path.resolve(root, 'dist', 'rollup', 'bundle.js'),
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    progress(),
    json(),
    scss({
      output: path.resolve(root, 'dist', 'rollup', 'bundle.css'),
    }),
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    // https://github.com/rollup/rollup-plugin-commonjs/issues/166#issuecomment-328853157
    re({
      patterns: [
        {
          match: /formidable(\/|\\)lib/,
          test: 'if (global.GENTLY) require = GENTLY.hijack(require);',
          replace: '',
        }
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'module.hot': false
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/lodash/lodash.js': ['find', 'orderBy'],
        'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js': ['render']
      }
    }),
    visualizer(),
    serve({
      contentBase: path.resolve(root, 'dist', 'rollup'),
      historyApiFallback: true,
      open: true
    }),
    livereload()
  ]
};

