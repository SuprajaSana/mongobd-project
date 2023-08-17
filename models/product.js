const mongoose = require("mongoose");

const Schema=mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required:true
  },
  price: {
    type: Number,
    required:true
  },
  description: {
    type: String,
    required:true
  },
  imageUrl: {
    type: String
  }
})

module.exports=mongoose.model("Product",productSchema)

/* const mongodb = require("mongodb");
const getDB = require("../util/database").getDB;

class Product {
  constructor(title, price, imageUrl, description, id,userId) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId=new mongodb.ObjectId(userId)
  }

  save() {
    const db = getDB();
    let dbnew;
    if (this._id) {
      dbnew = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbnew = db.collection("products").insertOne(this);
    }
    return dbnew
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDB();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDB();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDB();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;  */
