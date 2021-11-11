// establishes a connection with the game server
const net = require("net");
// Get logging functions from log.js
const { cl, setPrefix } = require("./log");
//Set default prefix for logging to "Server"
setPrefix("Client");

const sendName = (conn, name) => {
  cl(`Sending name to server (${name})`);
  conn.write(`Name: ${name}`);
};

const connect = function () {
  cl("Connecting ...");

  const conn = net.createConnection({
    host: 'localhost', // IP address here,
    port: 50541,// PORT number here,
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  conn.on('connect', (data) => {
    cl("Connection established");
    sendName(conn,'JW');
  });

  conn.on('data', (data) => {
    cl(data, "Server");
  });
  return conn;
};

module.exports = { connect };