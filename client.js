// client.js: Manages the connection with the game server

// Get configuration
const { CONNECT_TO, PLAYER_INITIALS } = require("./constants");

// Get TCP tools
const net = require("net");

// Get logging functions from log.js
const { cl, setPrefix } = require("./log");

// Set default prefix for logging
setPrefix("Client");

// Set our name on the server
const sendName = (conn, name) => {
  cl(`Sending name/player initials to server: ${name}`);
  conn.write(`Name: ${name}`);
};

// Check if we got kicked out. If so, terminate the app.
const checkForDeath = (data) => {
  if (data.match(/ded/)) {
    cl("The server has kicked you out. Goodbye!");
    process.exit();
  }
};

// Initialize connection to game server
const connect = function(name) {
  cl(`Attempting to connect to ${CONNECT_TO.IP}:${CONNECT_TO.PORT}`);

  const conn = net.createConnection({
    host: CONNECT_TO.IP,  // IP address here,
    port: CONNECT_TO.PORT,// PORT number here,
  });

  // Interpret incoming data as text
  conn.setEncoding("utf8");

  // Connection attempt succeeded
  conn.on('connect', () => {

    cl("Connection established");

    // Set our name from command line argument (if present) or PLAYER_INITALS constant
    sendName(conn, name ? name : PLAYER_INITIALS);

  });

  // Handle incoming data
  conn.on('data', (data) => {

    // Remove delimiter if present
    if (data[0] === '\n') {
      data = data.substr(1);
    }

    // Log data to the console
    cl(data, "Server");

    // Terminate app if we got kicked out
    checkForDeath(data);

  });

  return conn;
};

module.exports = { connect };