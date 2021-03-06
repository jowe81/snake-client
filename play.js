// play.js: entry point into the app

// Get the client module to handle connection to server
const { connect } = require('./client');

// Get the setupInput function to init UI
const { setupInput } = require('./input');

// Get cmdline arguments
const args = require('./args');

// Start the game: connect to the server and start the UI
setupInput(connect(args.name, args.ip, args.port));
