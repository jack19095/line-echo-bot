const Parse = require('./parse-helper');
const User = require('./user');

const PARSE_CLASS_NAME = 'Booking';

class Booking extends Parse.Object {
  constructor (id) {
    super(PARSE_CLASS_NAME);
    this.id = id;
  }
  static async current (lineId) {
    const query = new Parse.Query(Booking);
    query.equalTo('lineId', lineId);
    return query.first();
  }
  /**
   *
   * @param {*} form
   * {
   *   userId: '1zEcyElZ80',
   *   closeDate: 'January 2, 2018',
   *   productIds: [
   *     'vL1',
   *     'vL2'
   *   ],
   *   productAmounts: [
   *     '1',
   *     '2'
   *   ],
   *   warranty: '11'
   * };
   */
  static async create (data) {
    let booking = new Booking();
    let { closeDate, renewal, userId, productCategory,
      state = 'pending' } = data;
    console.log(data);
    booking.set('productCategory', productCategory);
    booking.set('closeDate', new Date(closeDate));
    booking.set('renewal', renewal);
    booking.set('state', state);
    booking.set('applicant', new User(userId));
    return booking.save();
  }
  static getBaseQuery (filter) {
    console.log(filter);
    const query = new Parse.Query(Booking);
    query.include('productBookingIds');
    query.include('productBookingIds.product');
    query.include('applicant');
    query.include('company');
    if (filter) {
      for (let key in filter) {
        query.equalTo(key, filter[key]);
      }
    }
    return query;
  }

  static async getUserBookings (userId, filter) {
    const query = Booking.getBaseQuery(filter);
    query.equalTo('applicant', new User(userId));
    return query.find();
  }
  static async getAll (filter) {
    const query = Booking.getBaseQuery(filter);
    return query.find();
  }
  static async getById (id) {
    const query = Booking.getBaseQuery();
    return query.get(id);
  }
}

Parse.Object.registerSubclass(PARSE_CLASS_NAME, Booking);

Booking.STATE_TRANSLATE_TABLE = {
  pending: '待審核',
  approved: '通過',
  reject: '拒絕',
};

module.exports = Booking;
