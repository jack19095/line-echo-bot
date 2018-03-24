const Parse = require('./parse-helper');

const PARSE_CLASS_NAME = 'Company';

class Company extends Parse.Object {
  constructor (id) {
    super(PARSE_CLASS_NAME);
    this.id = id;
  }
  static async current (lineId) {
    const query = new Parse.Query(Company);
    query.equalTo('lineId', lineId);
    return query.first();
  }
  /**
   * @param {*} form
   */
  static async createFromForm (form) {
    let company = new Company();
    let { name, companyId, email, phone, address } = form;
    company.set('name', name);
    company.set('companyId', companyId);
    company.set('email', email);
    company.set('phone', phone);
    company.set('address', address);
    return company.save();
  }
  static async getAll () {
    const query = new Parse.Query(Company);
    return query.find();
  }
  static async getById (id) {
    const query = new Parse.Query(Company);
    return query.get(id);
  }
}

Parse.Object.registerSubclass(PARSE_CLASS_NAME, Company);

module.exports = Company;
