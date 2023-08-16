const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect =(callback) => {
  MongoClient.connect(
    "mongodb+srv://sanasupraja:Saana@cluster0.xoelnru.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected");
      db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
}

const getDB = () => {
  if (db) {
    return db;
  }
  throw 'NO DATABASE FOUND!'
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;