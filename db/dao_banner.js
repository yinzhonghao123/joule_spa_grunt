/**
 * 操作数据库的index_banners的dao模块
 */
var connection = require('./connection')

var mongoose = connection.mongoose;

var bannerSchema = new mongoose.Schema({
    "img_src": String,
    "link": String,
    "sort": Boolean
});

var BannerModel = mongoose.model('index_banner', bannerSchema);

function getBanners(callback) {
    BannerModel.find(callback);
}
exports.getBanners = getBanners;