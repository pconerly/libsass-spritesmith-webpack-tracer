var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
// var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var SpritesmithPlugin = require('webpack-spritesmith');
var pathParse = require('path-parse');
path.parse = pathParse;

BUILD_ROOT = path.join(__dirname, 'build');
JS_ROOT = path.join(__dirname, 'app');
PROJECT_ROOT = path.join(JS_ROOT, '..');
NODE_MODULES_ROOT = path.join(PROJECT_ROOT, 'node_modules');
SASS_ROOT = path.join(__dirname, 'static', 'css');
SPRITESMITH_OUTPUT = path.join(__dirname, 'static', 'spritesmith-generated');

makeDirIfMissing = function(folder_name) {
  if (!fs.existsSync(folder_name)) {
    fs.mkdirSync(folder_name);
  }
}

makeDirIfMissing(BUILD_ROOT);
makeDirIfMissing(SPRITESMITH_OUTPUT);

console.log("SASS_ROOT");
console.log(SASS_ROOT);

var config = [{
  name: 'js',
  context: JS_ROOT,
  entry: {
    app: 'app.js',
  },
  output: {
    path: path.join(BUILD_ROOT, 'js'),
    filename: "app.js",
  },
  plugins: [
  ],
  cache: true,
  resolve: {
    extensions: ['', '.es6.js', '.js', '.jsx', '.cjsx', '.coffee'],
    modulesDirectories: [
      JS_ROOT,
      NODE_MODULES_ROOT,
    ]
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
    ],
  },
  watchDelay: 0,
  devtool: 'eval',

}, {
  name: 'sprites-and-css',
  context: SASS_ROOT,
  entry: {
    fashion: './fashion.scss',
  },
  output: {
    path: path.join(BUILD_ROOT, 'css'),
    filename: "fuckyouwebpack.js",
  },
  resolve: {
    extensions: ['', '.scss'],
  },
  module: {
    loaders: [
      {test: /\.png$/, loaders: [
          'file?name=i/[hash].[ext]'
      ]},
      {test: /\.jpg$/, loaders: [
          'file?name=i/[hash].[ext]'
      ]},
      { 
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "raw-loader!sass-loader?debug_info=true")
      },
    ],
  },
  watchDelay: 0,
  devtool: 'eval',
  plugins: [
      new SpritesmithPlugin({
          src: {
              cwd: path.resolve(__dirname, 'static/images/'),
              glob: '*.jpg'
          },
          target: {
              image: path.resolve(__dirname, 'build/css/sprite.jpg'),
              css: path.resolve(__dirname, 'static/spritesmith-generated/sprite-jpg.scss')
          },
          apiOptions: {
              cssImageRef: "sprite.jpg"
          }
      }),
      new SpritesmithPlugin({
          src: {
              cwd: path.resolve(__dirname, 'static/images/'),
              glob: '*.png'
          },
          target: {
              image: path.resolve(__dirname, 'build/css/sprite.png'),
              css: path.resolve(__dirname, 'static/spritesmith-generated/sprite-png.scss')
          },
          apiOptions: {
              cssImageRef: "sprite.png"
          }
      }),
      new ExtractTextPlugin("[name].css"),
  ]

},
]


module.exports = config
