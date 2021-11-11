const { connect } = require('./client');
const { cl } = require('./log');
const { setupInput } = require('./input');

setupInput();
connect();
