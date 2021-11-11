//Get the command line arguments
const rawArgs = process.argv.slice(2);

//Object that will hold arguments as key-value pairs
const args = {};

for (let i = 0; i < rawArgs.length; i += 2) {
  //Extract key value pair and add it to the args object
  if (rawArgs[i].substr(0,1) === "-" && rawArgs[i].length > 1) {
    let newKey = rawArgs[i].substr(1);
    let newValue = rawArgs[i + 1];
    if (newValue) {
      args[newKey] = newValue;
    }
  }
}

module.exports = args;