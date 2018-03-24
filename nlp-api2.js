const request = require("request");

let body = {
    "encodingType": "UTF8",
    "document": {
      "type": "PLAIN_TEXT",
      "content": "Enjoy your vacation!"
    }
  };

  let options = {
      url: 'POST https://language.googleapis.com/v1/documents:analyzeSentiment',
      mathod: 'POST',
      qs: {
          key: 'AIzaSyB9X3lIhhqfv1mwo5dslL61Sl9J-T21jLk',
      },
      json: body
  };

request(options, (error, response, body)=>{
    console.log(JSON.stringify(body, null, 2));
})