const mongodb = require("mongodb");
const getDB = require("../util/database").getDB;

class User {
  constructor(username,email,cart,id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id=new mongodb.ObjectId(id)
  }

  save() {
    const db = getDB();
    return db.collection("Users").insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  addToCart(product) {

    const cartItemIndex = this.cart.items.findIndex(cartProduct => {
      return cartProduct.productId.toString() === product._id.toString();
    })

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    
    if (cartItemIndex >= 0) {
      newQuantity = this.cart.items[cartItemIndex].quantity + 1;
      updatedCartItems[cartItemIndex].quantity=newQuantity
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: 1,
      });
    }

    const updatedCart = { items: updatedCartItems }
    const db = getDB();
    return db.collection("Users").updateOne({ _id: this._id }, { $set: { cart: updatedCart } })
  }

  static findUserById(userId) {
    const db = getDB();
    return db
      .collection("Users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
