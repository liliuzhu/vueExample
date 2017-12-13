/**
 * Created by LiLiuzhu on 2017/11/1.
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    entry:"./entry.js",
    output:{
        path:__dirname+"/dist",
        filename:"bundle.js"
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                loader:'style-loader'
            },
            {
                test:/\.css$/,
                loader:"css-loader"
            },
            {
                test:/\.jpg$/,
                loader:"file-loader",
                options:{
                    name:"[path][name].[ext]"
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin()]
};