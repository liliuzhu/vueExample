const express = require('express');
const config = require('./config/index');
const port = process.env.PORT || config.build.port;
const history = require('connect-history-api-fallback');


const app = new express();
app.use(history({index: '/index.html'}));

const router = express.Router();
let shopData = require("./data.json");
router.get('/shop/seller', function (req, res) {
    res.json({status: true, body: shopData.seller});
});
router.get('/shop/goods', function (req, res) {
    res.json({status: true, body: shopData.goods});
});
router.get('/shop/ratings', function (req, res) {
    res.json({status: true, body: shopData.ratings});
});
router.get('/shop', function (req, res) {
    res.json({status: true, body: shopData});
});
app.use('/api', router);
app.use(express.static('./dist'));




module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
});
