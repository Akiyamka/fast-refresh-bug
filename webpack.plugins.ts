
import { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { RuntimeVariablesPlugin } from './build/webpack-plugins/runtime-variables-plugin';
import { readEnvVariables, flatEnv } from './build/envVarsReader';
import { CleanLogSpamPlugin } from './build/webpack-plugins/clean-log-spam-plugin'
import { Env } from 'webpack.config';

export const getPlugins = (env: Env) => ([
  new CleanWebpackPlugin(),
  new RuntimeVariablesPlugin({
    fileName: 'config.json',
    variables: readEnvVariables().runtime
  }),
  new HtmlWebpackPlugin({
    template: './public/index.ejs',
    filename: 'index.html',
    favicon: './public/favicon-32x32.png',
    templateParameters: {
      NODE_ENV: process.env.NODE_ENV,
      ...readEnvVariables().buildtime
    }
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css?[chunkhash]',
    chunkFilename: '[id].css?[chunkhash]',
  }),
  new CleanLogSpamPlugin('mini-css-extract-plugin'),
  new DefinePlugin({
    'process.env.PRODUCTION': env.production || !env.development,
    'process.env.NAME': JSON.stringify(require('./package.json').name),
    'process.env.VERSION': JSON.stringify(require('./package.json').version),
    ...flatEnv(readEnvVariables().buildtime)
  }),
  env.development && new ForkTsCheckerWebpackPlugin({
    eslint: {
      files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
    }
  })
].filter(f => f));
