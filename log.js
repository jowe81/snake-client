//Simplify console.log commands, with optional prefix
let _prefix;
//Change prefix
const setPrefix = (prefix) => _prefix = prefix;
//Remove prefix
const clearPrefix = () => _prefix = undefined;

const getPrefix = () => _prefix;

/*
  Log out "text", or "_prefix: text"
  If prefix is passed, use it instead of the stored prefix
*/
const cl = (text, prefix) => {
  let prefixToLog;
  prefix ? prefixToLog = prefix : prefixToLog = getPrefix();
  if (prefixToLog) {
    console.log(`${prefixToLog}: ${text}`);
  } else {
    console.log(text);
  }
};

module.exports = { setPrefix, getPrefix, clearPrefix, cl };