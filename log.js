// log.js: Log a line to the console with an optional prefix

// Third party module to highlight text
const chalk = require('chalk');

// Store defalt prefix here
let _prefix;

// Set a minimum prefix length to indent log entries consistently
const _prefixMinLength = 7;

// Change prefix
const setPrefix = (prefix) => _prefix = prefix;

// Remove prefix
const clearPrefix = () => _prefix = undefined;

// Return prefix
const getPrefix = () => _prefix;

// Pad string with spaces to minimum length
const pad = (string, minLength) => {
  return string + " ".repeat(minLength);
};

// Log out "text", or "_prefix: text"
// The prefix argument is optional: when present, use it instead of the stored prefix
// If text2 and colors are present, these will be logged after text
const cl = (text, prefix, text2, bgColor, textColor) => {
  //Prepare text2 with indicated colors, if present, and concatenate with text
  if (textColor) {
    text += " " + chalk[bgColor][textColor](text2);
  }
  // If no prefix is passed in, use default
  let prefixToLog = prefix || getPrefix();
  if (prefixToLog) {
    // Ensure minimum length of prefix
    const spaces = pad("", _prefixMinLength - prefixToLog.length);
    // Invert prefix color and add padding
    prefixToLog = chalk.bgGreen.black(` ${prefixToLog}:${spaces}`);
    // Log out prepared line
    console.log(`${prefixToLog} ${text}`);
  } else {
    //No prefix or other arguments, simply log text
    console.log(text);
  }
};

module.exports = { setPrefix, getPrefix, clearPrefix, cl };
