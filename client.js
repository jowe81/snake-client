// establishes a connection with the game server
const net = require("net");

const connect = function () {
  console.log("Connecting ...");

  const conn = net.createConnection({
    host: 'localhost', // IP address here,
    port: 50541,// PORT number here,
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");
  conn.on('data', (data) => {
    console.log("Server: ", data);
  });
  return conn;
};

module.exports = { connect };