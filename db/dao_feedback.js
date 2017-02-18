/**
 * 操作feedbacks集合的dao模块
 */
var connection = require('./connection')

//test #start
/*connection.connect();
function callback(error, feedback) {
 console.log(error, feedback);
}*/
//test #end

//mongoose
var mongoose = connection.mongoose;

//schema
var feedbackSchema = new mongoose.Schema({
    user_id : String,
    phone : String,
    content : String,
    create_time : Date
});

//model
var FeedbackModel = mongoose.model('feedback', feedbackSchema);

//addFeedback()
function addFeedback (feedback, callback) {
    feedback.create_time = Date.now();
    new FeedbackModel(feedback).save(callback);
}
//exports.addFeedback = addFeedback;
/*addFeedback({
    "user_id": "576bbe0aa1d183c42c06c08e",
    "phone": "13716962771",
    "content": "不错不错22222!"
}, callback)*/

module.exports = {addFeedback: addFeedback};

