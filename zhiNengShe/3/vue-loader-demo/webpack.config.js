/**
 * Created by Administrator on 2017/9/7.
 */
var path = require('path');
var webpack = require('webpack');
module.exports={
    entry:'./main.js',
    output:{
        //path:__dirname,
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename:'build.js'
    },

    module:{
        loaders:[
            {test:/\.vue$/,use:['vue-loader']},//vue-loader
            {test:/\.js$/,use:['babel-loader'],exclude:/node_modules/}
        ]
    }
};