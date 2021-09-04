const redis = require('redis');

let redisClient = redis.createClient();
redisClient.on('connect',function() {
    console.log('----------redis connected-----------');
})

function setKeyValue(key, value) {
    return new Promise(function (resolve, reject) {
        redisClient.set(key, value, function (err, data) {
            if (err) {
                reject(new Error("Error occured during saving data" + err.message));
            } else {
                resolve(data);
            }
        });
    });
}
function setObject(key, value) {
    return new Promise(function (resolve, reject) {
        redisClient.hmset(key, value, function (err, data) {
            if (err) {
                reject(new Error("Error occured during saving data" + err.message));
            } else {
                resolve(data);
            }
        });
    });
}
function getValue(key) {
    return new Promise(function (resolve, reject) {
        redisClient.get(key, function (err, data) {
            if (err) {
                reject(new Error("Error occured during getting data" + err.message));
            } else {
                resolve(data);
            }
        });
    });
}

function getAllKeys() {
    return new Promise(function (resolve, reject) {
        redisClient.keys('*', function (err, data) {
            if (err) {
                // reject("Error occured during retreiving all keys"+err.message);
                reject(new Error("Error occured during retreiving all keys" + err.message));
            } else {
                resolve(data);
            }
        });
    });
}

function removeKey(key) {
    return new Promise(function (resolve, reject) {
        redisClient.del(key, function (err, response) {
            if (response == 1) {
                resolve("Deleted Successfully!");
            } else {
                reject(new Error("Cannot delete" + err.message));
            }
        });
    });
}

module.exports = {
    setKeyValue,
    getValue,
    getAllKeys,
    removeKey,
    setObject
};