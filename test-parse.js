let Parse = require('parse/node');
Parse.initialize('ulink', 'ulinkjs');
Parse.serverURL = 'http://210.242.250.42:1337/parse';
// Parse.serverURL = 'http://localhost:1337/parse';

let ParseObject = Parse.Object.extend('Product');
let object = new ParseObject();

object.set('pdCategory', 'test');

object.save(null, {
  success: function (object) {
    // Execute any logic that should take place after the object is saved.
    console.log('New object created with objectId: ' + object.id);
  },
  error: function (object, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    console.log('Failed to create new object, with error code: ' + error.message);
  }
});

const query = new Parse.Query(ParseObject);
query.equalTo('pdCategory', 'DateCore');
query.find(console.log);
