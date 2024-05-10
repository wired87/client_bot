const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'production', // or 'development' or 'none'
    entry: glob.sync('./src/bot/BotRoot.tsx'),

  output: {
    filename: 'iframeContent.js',
    path: path.resolve(__dirname, 'dist_bot'),
    library: 'botWindow',
    libraryTarget: 'umd',  // UMD Format
    umdNamedDefine: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',

        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/bot.html', // Pfad zu deiner HTML-Vorlage
      filename: 'bot.html', // Ausgabedatei, die im `dist_bot`-Verzeichnis erstellt wird
      chunks: ['bot'], // Stellt sicher, dass nur das Bot-Bundle eingebunden wird
    }),
],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  }
};

/*
.sort((a, b) => {
    // Sortiere so, dass CSS-Dateien zuerst kommen
    if (a.endsWith('.css') && b.endsWith('.js')) return -1;
    if (a.endsWith('.js') && b.endsWith('.css')) return 1;
    return 0;
 */