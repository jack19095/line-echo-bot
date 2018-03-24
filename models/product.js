const Parse = require('./parse-helper');

const PARSE_CLASS_NAME = 'Product';

class Product extends Parse.Object {
  constructor (id) {
    super(PARSE_CLASS_NAME);
    this.id = id;
  }
  /**
   * @param {Parse.File} file
   */
  static async findByCategoryAndQuality (category, quality) {
    const query = new Parse.Query(Product);
    if (category) {
      query.equalTo('PdCategory', category);
    }
    if (quality) {
      query.equalTo('PdQuality', quality);
    }
    return query.find();
  }
  static async findByPdId (pdId) {
    const query = new Parse.Query(Product);
    query.equalTo('PdID', pdId);
    return query.first();
  }
  static async getAll () {
    const query = new Parse.Query(Product);
    return query.find();
  }
  static async getById (id) {
    const query = new Parse.Query(Product);
    return query.get(id);
  }
}

Parse.Object.registerSubclass(PARSE_CLASS_NAME, Product);

module.exports = Product;
