const Parse = require('./parse-helper');

const PARSE_CLASS_NAME = 'ProductFormBk';

class ProductFormBk extends Parse.Object {
  constructor (id) {
    super(PARSE_CLASS_NAME);
    this.id = id;
  }
  /**
   * @param {Parse.File} file
   */
  static async create (product, booking, amount) {
    let productFormBk = new ProductFormBk();
    productFormBk.set('product', product);
    productFormBk.set('booking', booking);
    productFormBk.set('amount', amount);
    return productFormBk.save();
  }
  static async getAll () {
    const query = new Parse.Query(ProductFormBk);
    return query.find();
  }
  static async getById (id) {
    const query = new Parse.Query(ProductFormBk);
    return query.get(id);
  }
}

Parse.Object.registerSubclass(PARSE_CLASS_NAME, ProductFormBk);

module.exports = ProductFormBk;
