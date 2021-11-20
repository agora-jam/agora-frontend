const webpack = require('webpack');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

const environment = process.env.NODE_ENV;
const isProduction = environment === 'production';

const ENTRY = path.join(__dirname, './src/index.jsx');
const OUTPUT = path.join(__dirname, 'public');
const FILES_DIRECTORY = './public';

module.exports = {
  entry: ENTRY,
  output: {
    filename: 'bundle.js',
    path: OUTPUT,
    publicPath: '/',
  },
  mode: environment,
  devtool: 'inline-source-map',
  devServer: {
    static: { directory: FILES_DIRECTORY },
    port: 9000,
    historyApiFallback: true,
    compress: true,
    client: {
      overlay: true,
    },
  },
  optimization: {
    concatenateModules: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.mp4$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'video',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(environment),
    }),
    // new WebpackBundleAnalyzer(),
  ],
};
