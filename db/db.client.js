
/*var mongo = require("mongodb");
var MongoClient = mongo.MongoClient,
    Server = require('mongodb').Server,
    BSON = mongo.BSONPure;*/
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    ObjectId = require('mongodb').ObjectID,
    assert = require('assert'),
format = require('util').format;

exports.getDbClient = function() {

    return MongoClient;
};

exports.dbHost = function() {
    return "127.0.0.1:27017";
};

exports.dbName = function() {
    return "traider";
};

exports.makeObjectID = function(id) {
    return new ObjectId(id);
};