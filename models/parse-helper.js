/**
 * @type {Parse}
 * @module Parse
 */

const config = require('config');
const Parse = require('parse/node');

const APP_ID = config.get('PARSE_APP_ID');
const JAVASCRIPT_KEY = config.get('PARSE_JAVASCRIPT_KEY');

Parse.initialize(APP_ID, JAVASCRIPT_KEY);
Parse.serverURL = config.get('PARSE_URL');

module.exports = Parse;
