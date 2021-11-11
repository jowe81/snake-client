// establishes a connection with the game server
const net = require("net");
// Get logging functions from log.js
const { cl, setPrefix } = require("./log");
//Set default prefix for logging to "Server"
setPrefix("Server");

const connect = function () {
  cl("Connecting ...", "Client");

  const conn = net.createConnection({
    host: 'localhost', // IP address here,
    port: 50541,// PORT number here,
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  conn.on('connection', (data) => {
    cl(data);
  });
  conn.on('data', (data) => {
    cl(data);
  });
  return conn;
};

module.exports = { connect };