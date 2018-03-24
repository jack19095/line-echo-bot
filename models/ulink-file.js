const Parse = require('./parse-helper');
const User = require('./user');

const PARSE_CLASS_NAME = 'UlinkFile';

class UlinkFile extends Parse.Object {
  constructor (id) {
    super(PARSE_CLASS_NAME);
    this.id = id;
  }
  /**
   * @param {Parse.File} file
   */
  static async create (file, userId) {
    let ulinkFile = new UlinkFile();
    ulinkFile.set('file', file);
    if (userId) {
      ulinkFile.set('uploader', new User(userId));
    }
    return ulinkFile.save();
  }
  static async getAll () {
    const query = new Parse.Query(UlinkFile);
    return query.find();
  }
  static async getById (id) {
    const query = new Parse.Query(UlinkFile);
    return query.get(id);
  }
}

Parse.Object.registerSubclass(PARSE_CLASS_NAME, UlinkFile);

module.exports = UlinkFile;
