var chalk = require('chalk'),
fs = require('fs');

function loggerjs(message) {
  var log = '(LOG): ' + Date() + ': '  + message
  console.log(chalk.green(log))
  fsLog(log)
}
// info
loggerjs.info = (message) => {
  var info = '(INFO): ' + Date() + ': '  + message
  console.info(chalk.blue(info))
  fsLog(info)
}
// warn
loggerjs.warn = (message) => {
var warn = '(WARN): ' + Date() + ': '  + message
console.warn(chalk.yellow(warn))
fsLog(warn)
}


// error
loggerjs.error = (message) => {
var error = '(ERROR): ' + Date() + ': '  + message;
console.error(chalk.red(error))
fsLog(error)
}


// emergency
loggerjs.emergency = (message) => {
var emergency = '(EMERGENCY): ' + Date() + ': '  + message;
console.error(chalk.bgYellow.red(emergency))
fsLog(emergency)
}

// settings
loggerjs.set = (option) => {
options = option
loggerMsg('OPTIONS FOUND')
}

// main logging for the logger 
function loggerMsg(message){
  console.log(chalk.bgWhite.green('(LOGGER) : ' + Date() + ': ' + message))
}
// file logging 
function fsLog(logText) {
if(process.env.fileName|| false){
fs.appendFile(process.env.fileName||'logs.log',`\n ${logText} \n` , (err) => {
  if (err) throw err;
});
  }
}




// remove log 
loggerjs.removeLog = () => {
  cleanLog()
}
function cleanLog(){
  fs.unlinkSync(process.env.fileName || 'logs.log')
}
loggerjs.callog = async () => {
var {sid,toFormatted,fromFormatted,startTime,endTime} = (await client.calls.list())[0],
msgg = '(CALLER) : ' + Date() + ': ' + `SID : ${sid} , Started : ${startTime} Ended : ${endTime} , From : ${fromFormatted} , To : ${toFormatted}`
console.log(chalk.bgWhite.green(msgg))
fsLog(msgg)
}
module.exports = loggerjs