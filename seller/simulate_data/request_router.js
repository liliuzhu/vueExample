/**
 * Created by LiLiuzhu on 2017/12/6.
 */
//app=new express()   server=new Server() 服务器
function setup(app,server){
  //console.log("启动中");

  let shopData=require("../data.json");
  /*
  * 添加监控在after和setup阶段均可after不可以
  * */
  var express = require('express');
  var router = express.Router();
  router.get('/shop/seller', function(req, res) {
    res.json({ status: true,body: shopData.seller});
  });
  router.get('/shop/goods', function(req, res) {
    res.json({ status: true,body: shopData.goods});
  });
  router.get('/shop/ratings', function(req, res) {
    res.json({ status: true,body: shopData.ratings});
  });
    router.get('/shop', function(req, res) {
        res.json({ status: true,body: shopData});
    });
  app.use('/api',router);
}
module.exports = setup;
