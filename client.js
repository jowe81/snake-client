// establishes a connection with the game server
const net = require("net");
// Get logging functions from log.js
const { cl, setPrefix } = require("./log");
//Set default prefix for logging to "Server"
setPrefix("Client");

//Set our name on the server
const sendName = (conn, name) => {
  cl(`Sending name to server (${name})`);
  conn.write(`Name: ${name}`);
};

//Send a move command
const move = (conn, direction) => {
  if (['up', 'down', 'left', 'right'].includes(direction)) {
    //This is a valid direction - send the command
    cl(`Sending the Move: ${direction} command`);
    conn.write(`Move: ${direction}`);
  }
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
    setInterval(() => move(conn, 'up'), 100);
  });

  conn.on('data', (data) => {
    cl(data, "Server");
  });
  return conn;
};

module.exports = { connect };