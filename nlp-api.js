// Imports the Google Cloud client library
const language = require('@google-cloud/language');
const path = require('path');

// Instantiates a client
const client = new language.LanguageServiceClient({
    keyFilename: path.resolve(__dirname, 'line2bot-d90bad90a685.json')
});

// The text to analyze
const text = '我身上的衣服和褲子都是在 Zara 買的';

const document = {
  content: text,
  type: 'PLAIN_TEXT',
};

// Detects the sentiment of the text
client
  .analyzeSentiment({document: document})
  .then(results => {
    const sentiment = results[0].documentSentiment;

    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    console.log(JSON.stringify(results,null,2));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

  // Detects entities in the document
client
  .analyzeEntities({document: document})
  .then(results => {
    const entities = results[0].entities;

    console.log('Entities:');
    entities.forEach(entity => {
      console.log(entity.name);
      console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
      if (entity.metadata && entity.metadata.wikipedia_url) {
        console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
      }
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

  // Detects syntax in the document
client
.analyzeSyntax({document: document})
.then(results => {
  const syntax = results[0];

  console.log('Tokens:');
  syntax.tokens.forEach(part => {
    console.log(`${part.partOfSpeech.tag}: ${part.text.content}`);
    console.log(`Morphology:`, part.partOfSpeech);
  });
})
.catch(err => {
  console.error('ERROR:', err);
});

async function analyze(text) {
    let sentiment = await client.analyzeSentiment({ document });
    let entities = await client.analyzeEntities({ document });
    let syntax = await client.analyzeSyntax({ document });
    return {
        sentiment, entities, syntax
    };
}

// analyze(text).then(console.log(JSON.stringify(text,null,2)));

module.exports = analyze;