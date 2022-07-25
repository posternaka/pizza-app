const path = require('path');
const  HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        },
    }

    if(isProd) {
        config.minimizer = [
            new CssMinimizerPlugin({
                test: /\.css$/i,
            }),
            new TerserPlugin()
        ]
    }
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                // hmr: isDev,
                // reloadAll: true,
            }
        },
            'css-loader',
    ]   

    if(extra) {
        loaders.push(extra)
    }

    return loaders
}

const babelOptions = preset => {
    const options = {
        presets: [
            '@babel/preset-env',
        ]
    }

    if(preset) {
        options.presets.push(preset)
    }

    return options
}

const jsLoaders = () => {
    const loaders = [{
        loader: "babel-loader",
        options: babelOptions(),
      }]

      if(isDev) {
        loaders.push('eslint-loader')
      }

      return loaders
}

module.exports = {
    // в контексте задаем папку src, где лежат все исходники приложения
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.jsx'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.jpg', '.ts', '.jsx'],
        // чтобы не указывать относительные пути, можно задать 
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@img': path.resolve(__dirname, 'src/assets/img'),
            '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
            '@style': path.resolve(__dirname, 'src/styles/scss')
        }
    },
    // эта настройка для оптимизации библиотек, которые могут подключаться к разным скриптам. например, есть jquery, она подключается к двум входным точкам. вепбак это проанализирует и будет использовать как однин вход
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "/"),
        },
    },
    devtool: isDev ? 'source-map' : 'eval-cheap-module-source-map',
    plugins: [
        new HTMLWebpackPlugin(
            {
                template: './index.html',
                minify: {
                    collapseWhitespace: isProd,
                },
            }
        ),
        // new CopyWebpackPlugin(
        //     {
        //         patterns: [
        //             { from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, 'dist') },
        //         ]
        //     }
        // ),
        new MiniCssExtractPlugin(
            {
                filename: filename('css'),
            }
        ),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: cssLoaders(),
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader'),
            },
            { 
                test: /\.(png|svg|jpe?g)$/, 
                use: ['file-loader']
            },
            { 
                test: /\.(ttf|woff1|woff2|eot)$/, 
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions(),
                  },
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: babelOptions('@babel/preset-typescript'),
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: babelOptions('@babel/preset-react'),
                }
            },
        ]
    },
}