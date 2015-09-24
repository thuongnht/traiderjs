var mongoHandler = require("./db.client.js");
var collectionName = "products";


exports.getById = function(id, callback) {
    if (callback === null || typeof(callback) !== "function") {
        throw "Call to db method must include callback function"
    }
    var mongoclient = mongoHandler.getDbClient();
    var dbHost = mongoHandler.dbHost();
    var dbName = mongoHandler.dbName();
    var uri = "mongodb://" + dbHost + "/" + dbName;

    mongoclient.connect(uri, function(err, db) {
        if(err) throw err;
        
        var mongoId;
        console.log("id:" + id);
        try {
            mongoId = mongoHandler.makeObjectID(id);
        } catch (e) {
            return callback(e);
        }
        console.log("id:" + mongoId);

        db.collection(collectionName).findOne({
            "_id": mongoId
        }, function(err, result) {
            if (err) {
                callback(err);
                return;
            } else {
                // Close the connection
                return callback(null, result);
            }
        });

    });

};

exports.getAll = function(callback) {
    if (callback === null || typeof(callback) !== "function") {
        throw "Call to db method must include callback function"
    }
    var mongoclient = mongoHandler.getDbClient();
    var dbHost = mongoHandler.dbHost();
    var dbName = mongoHandler.dbName();
    var uri = "mongodb://" + dbHost + "/" + dbName;
console.log(uri);
    mongoclient.connect(uri, function(err, db) {
        if(err) throw err;

        db.collection(collectionName).find({}, function(err, result) {
            if (err) {
                throw err.Message;
                return;
            } else {
                result.toArray(function(err, resultArray) {
                    console.log("Got data: " + resultArray.length + " records.");
                    return callback(resultArray);
                });
            }
        });

    });

};


exports.insert = function(data, callback) {
    var mongoclient = mongoHandler.getDbClient();
    var dbHost = mongoHandler.dbHost();
    var dbName = mongoHandler.dbName();
    var uri = "mongodb://" + dbHost + "/" + dbName;

    console.log(uri);

    mongoclient.connect(uri, function(err, db) {
        if(err) throw err;

        db.collection(collectionName).insert(data, function(err, result) {
            if (err) {
                throw err.Message;
                return;
            } else if (callback === null && typeof(callback) !== "function") {
                return callback(result);
            }
        });

    });

};