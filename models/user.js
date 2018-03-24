const Parse = require('./parse-helper');

class User extends Parse.Object {
  constructor (id) {
    // Pass the ClassName to the Parse.Object constructor
    super('UlinkUser');
    this.id = id;
  }
  /**
   * @param {string} lineId
   * @returns {Promise<User>}
   */
  static async current (lineId) {
    const query = new Parse.Query(User);
    query.equalTo('lineId', lineId);
    return query.first();
  }
  static async getAll (lineId) {
    const query = new Parse.Query(User);
    return query.find();
  }
  /**
   * @param {string} lineId
   * @returns {Promise<User>}
   */
  static async getById (id) {
    const query = new Parse.Query(User);
    return query.get(id);
  }
  async setContext (key, value) {
    let context = this.getContext();
    context[key] = value;
    this.set({ context });
    return this.save();
  }
  async setContextObject (object) {
    let context = this.getContext();
    for (let key in object) {
      context[key] = object[key];
    }
    this.set({ context });
    return this.save();
  }

  getContext (key) {
    let context = this.get('context') || {};
    if (!key) {
      return context;
    }
    return context[key];
  }

  getState () {
    return this.getContext('state') || {};
  }

  async addBookingFile (ulinkFileId) {
    let context = this.getContext();
    if (!context['bookingFiles']) {
      context['bookingFiles'] = [];
    }
    context['bookingFiles'].push(ulinkFileId);
    this.set('context', context);
    return this.save();
  }
  async cleanBookingFile () {
    let context = this.getContext();
    context['bookingFiles'] = [];
    this.set('context', context);
    return this.save();
  }
}

Parse.Object.registerSubclass('UlinkUser', User);

module.exports = User;
