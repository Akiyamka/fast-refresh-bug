import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Env } from 'webpack.config';

export const getModules = (env: Env) => ({
  rules: [
    {
      test: /\.tsx?$/,
      exclude: /dist/,
      use: [
        {
         loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        },
        {
          loader: 'babel-loader',
        }
      ]
    },
    {
      test: /\.module\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: {
              localIdentName: '[name]_[local]__[hash:base64:5]',
            },
            importLoaders: 1,
          },
        },
        {
          loader: 'postcss-loader',
        },
      ].filter(f => f),
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: false,
            importLoaders: 1,
          },
        },
        {
          loader: 'postcss-loader',
        },
      ].filter(f => f),
      exclude: /\.module\.css$/,
    },
  ]
});
