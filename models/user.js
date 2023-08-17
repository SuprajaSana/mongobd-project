const mongodb = require("mongodb");
const getDB = require("../util/database").getDB;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = new mongodb.ObjectId(id);
  }

  save() {
    const db = getDB();
    return db
      .collection("Users")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCart() {
    const db = getDB();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }

  addToCart(product) {
    const cartItemIndex = this.cart.items.findIndex((cartProduct) => {
      return cartProduct.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartItemIndex >= 0) {
      newQuantity = this.cart.items[cartItemIndex].quantity + 1;
      updatedCartItems[cartItemIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: 1,
      });
    }

    const updatedCart = { items: updatedCartItems };
    const db = getDB();
    return db
      .collection("Users")
      .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  deleteItemsFromCart(prodId) {
   /* const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== prodId.toString();
    });
    const db = getDB();
    return db
      .collection("Users")
      .updateOne(
        { _id: this._id },
        { $set: { cart: { items: updatedCartItems } } }
      ); */
    
     const cartItemIndex = this.cart.items.findIndex((cartProduct) => {
       return cartProduct.productId.toString() === prodId.toString();
     });

     let newQuantity;
     let updatedCartItems = [...this.cart.items];

    if (cartItemIndex >= 0) {
      if (this.cart.items[cartItemIndex].quantity > 1) {
        newQuantity = this.cart.items[cartItemIndex].quantity - 1;
        updatedCartItems[cartItemIndex].quantity = newQuantity;
      } else {
        updatedCartItems = this.cart.items.filter((item) => {
          return item.productId.toString() !== prodId.toString();
        });
      }
     }

     const updatedCart = { items: updatedCartItems };
     const db = getDB();
     return db
       .collection("Users")
       .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
    
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
