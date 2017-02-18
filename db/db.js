/**
 * 数据库操作的总接口模块
 */
var dao_address = require('./dao_address')
var dao_user = require('./dao_user')
var dao_feedback = require('./dao_feedback')
var dao_banner = require('./dao_banner')
var dao_meal = require('./dao_meal')
var dao_order = require('./dao_order')

module.exports = {

    getUser(phone, callback) {
        dao_user.getUser(phone, function (error, user) {
            if(error) {
                throw error;
            } else {
                callback(user);
            }
        })
    },

    addUser(phone, callback) {
        dao_user.addUser(phone, function (error, user) {
            if(error) {
                throw error;
            } else {
                callback(user);
            }
        })
    },

    addFeedback(feedback, callback) {
        dao_feedback.addFeedback(feedback, function (error, feedback) {
            if(error) {
                throw error;
            } else {
                callback(feedback);
            }
        })
    },

    getAddrsByUserId(userId, callback) {
        dao_address.getAddrsByUserId(userId, function (error, addrs) {
            if(error) {
                throw error;
            } else {
                callback(addrs);
            }
        })
    },

    addAddr(addr, callback) {
        dao_address.addAddr(addr, function (error, addr) {
            if(error) {
                throw error;
            } else {
                callback(addr);
            }
        })
    },

    deleteAddrById(id, callback) {
        dao_address.deleteAddrById(id, function (error, result) {
            if(error) {
                throw error;
            } else {
                callback(result);
            }
        })
    },

    updateAddr(addr, callback) {
        dao_address.updateAddr(addr, function (error, result) {
            if(error) {
                throw error;
            } else {
                callback(result);
            }
        })
    },

    getBanners(callback) {
        dao_banner.getBanners(function (error, banners) {
            if(error) {
                throw error;
            } else {
                callback(banners);
            }
        })
    },

    getMeals(callback) {
        dao_meal.getMeals(function (error, meals) {
            if(error) {
                throw error;
            } else {
                callback(meals);
            }
        })
    },

    getDefaultAddrByUserId(userId, callback) {
        dao_address.getDefaultAddrByUserId(userId, function (error, address) {
            if(error) {
                throw error;
            } else {
                callback(address);
            }
        })
    },

    addOrder(order, callback) {
        dao_order.addOrder(order, function (error, order) {
            if(error) {
                throw error;
            } else {
                callback(order);
            }
        })
    },

    getOrderById(id, callback) {
        dao_order.getOrderById(id, function (error, order) {
            if(error) {
                throw error;
            } else {
                callback(order);
            }
        })
    },

    getOrdersByUserId (userId, fn) {
        dao_order.getOrdersByUserId(userId, function (err, orderArr) {
            if(err) {
                throw err;
            } else {
                fn(orderArr);
            }
        })
    },
};
