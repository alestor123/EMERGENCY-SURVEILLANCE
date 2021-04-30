module.exports = (number,name,prior,loggerjs,client) => {
var mms = name + ' Has Declared Emergency With '+ prior +' Priority ' + 'You Mission Should You Choose To It To Provide Instructions Please contact in on the secure channels Good Luck This call will end in 3 2 1 . ';
client.messages.create({body: mms,from: process.env.NUM,to: '91'+number})
 console.log(mms)
ml = `<Response><Say>${mms|| 'No Message'} </Say></Response>`;
client.calls
  .create({
twiml: ml,
to: '91'+number,
from :process.env.NUM, 
})
.then(call =>{ 
loggerjs.info(`Call Id : ${call.sid}`) 
loggerjs.info.callog();
})
loggerjs.info(`Number ${number} From : ${process.env.NUM}`)
}
