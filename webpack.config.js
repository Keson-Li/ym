const webpack = require("webpack");
const path = require("path");

var jF= path.resolve(__dirname, "scripts");
var bF = path.resolve(__dirname, "build");

var config = {
    entry: {
        "addProduct":jF+"/addProduct.js",
        "header":jF+"/header.js",
        "index":jF+"/index.js",
        "login":jF+"/login.js",
        "main":jF+"/main.js",
        "menu":jF+"/menu.js",
        "modifyProduct":jF+"/modifyProduct.js",
        "modifyType":jF+"/modifyType.js",
        "productDetail":jF+"/productDetail.js",
        "products":jF+"/products.js",
        "purchase":jF+"/purchase.js",
        "sales":jF+"/sales.js",
        "shopingCart":jF+"/shopingCart.js",
        "statistic":jF+"/statistic.js",
    },
    output:{
        filename:"[name]bundle.js",
        path:bF
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery"
        })
    ]
};

module.exports = config;