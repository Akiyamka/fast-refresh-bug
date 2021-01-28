import path from 'path';
import { Configuration } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { readEnvVariables } from './build/envVarsReader';
import { setProxies } from './build/envProxies';
import { getPlugins } from './webpack.plugins';
import { getModules } from './webpack.modules';

export type Env = {
  production?: boolean;
  development?: boolean;
  [key: string]: any;
}

const setNodeEnv = (env) => process.env.NODE_ENV = env.development ? 'development' : 'production';
const webpackConfig = (env: Env): Configuration => (setNodeEnv(env), {
  entry: './src/index.tsx',
  target: 'web',
  ...(env.production || !env.development ? {
    devtool: 'nosources-source-map'
  } : {
    devtool: 'eval-source-map',
    devServer: {
      port: env.PORT || readEnvVariables().buildtime.PORT,
      open: true,
      openPage: '',
      inline: true,
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, 'dist'),
      overlay: true,
      proxy: setProxies(env.proxy),
    },
  }),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['node_modules'],
    symlinks: true,
    alias: {
      Public: path.resolve(process.cwd(), 'public/'),
      Common: path.resolve(process.cwd(), 'src/common/'),
    },
    //TODO waiting on https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/61
    //@ts-ignore
    plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'build.js'
  },
  module: getModules(env),
  plugins: getPlugins(env)
});

export default webpackConfig;
