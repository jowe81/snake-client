// log.js: Log a line to the console with an optional prefix

//Store defalt prefix here
let _prefix;

//Set a minimum prefix length to indent log entries consistently
const _prefixMinLength = 7;

//Change prefix
const setPrefix = (prefix) => _prefix = prefix;

//Remove prefix
const clearPrefix = () => _prefix = undefined;

//Return prefix
const getPrefix = () => _prefix;

/*
  Log out "text", or "_prefix: text"
  The prefix argument is optional: when present, use it instead of the stored prefix
*/
const cl = (text, prefix) => {
  let prefixToLog;
  prefix ? prefixToLog = prefix : prefixToLog = getPrefix();
  const spaces = " ".repeat(_prefixMinLength - prefixToLog.length);
  if (prefixToLog) {
    console.log(`${prefixToLog}:${spaces}${text}`);
  } else {
    console.log(text);
  }
};

module.exports = { setPrefix, getPrefix, clearPrefix, cl };
