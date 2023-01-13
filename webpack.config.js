const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Set the mode to development or production
    mode: 'development',
    entry: './src/index.js',

    // Spin up a server for quick development
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        open: true,
        hot: true,
        compress: true,
        port: 9000,
    },

    // Customize the webpack build process
    plugins: [
        new HtmlWebpackPlugin({
            favicon: path.resolve(__dirname, './public') + '/images/favicon.png',
            template: './index.html',
            inject: true
        })
    ],

    // Determine how modules within the project are treated
    module: {
        rules: [
            // JavaScript: Use Babel to transpile JavaScript files
            {test: /\.js$/, use: ['babel-loader']},

            // Images: Copy image files to build folder
            {test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource'},

            // Fonts and SVGs: Inline files
            {test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline'},

            // HTML
            {test: /\.html$/i, loader: "html-loader",},

            // Styles: Inject CSS into the head with source maps
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true, importLoaders: 1, modules: false},
                    },
                    {loader: 'postcss-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}},
                ],
            },
        ],
    },
};