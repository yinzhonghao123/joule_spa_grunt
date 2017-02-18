/**
 * 操作数据库的index_banners的dao模块
 */
var connection = require('./connection')

var mongoose = connection.mongoose;

var mealSchema = new mongoose.Schema({
    "group_id": String,
    "groupName": String,
    "mealCode": String,
    "mealType": Number,
    "mealName": String,
    "price": Number,
    "originalPrice": Number,
    "picture": String,
    "instruction": String,
    "sales": Number,
    "state": Number
});

var MealModel = mongoose.model('meal', mealSchema);

function getMeals(callback) {
    MealModel.find(callback);
}
exports.getMeals = getMeals;