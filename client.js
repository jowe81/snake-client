// client.js: Manages the connection with the game server

//Get configuration
const { CONNECT_TO, PLAYER_INITIALS } = require("./constants");
// Get TCP tools
const net = require("net");
// Get logging functions from log.js
const { cl, setPrefix } = require("./log");
//Set default prefix for logging
setPrefix("Client");

//Set our name on the server
const sendName = (conn, name) => {
  cl(`Sending name/player initials to server: ${name}`);
  conn.write(`Name: ${name}`);
};

const connect = function (name) {
  cl("Connecting ...");

  const conn = net.createConnection({
    host: CONNECT_TO.IP,  // IP address here,
    port: CONNECT_TO.PORT,// PORT number here,
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  conn.on('connect', (data) => {
    cl("Connection established");
    sendName(conn, name ? name : PLAYER_INITIALS);
  });

  conn.on('data', (data) => {
    if (data[0] === '\n') {
      data = data.substr(1);
    }
    cl(data, "Server");
  });
  return conn;
};

module.exports = { connect };