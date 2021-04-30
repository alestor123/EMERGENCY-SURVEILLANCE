#!/usr/bin/env node

require('dotenv').config()

var express = require('express'),
app = express(),
http = require('http').Server(app),
io = require('socket.io')(http),
loggerjs = require('./modules/log'),
authErr = require('./modules/authres'),
call = require('./modules/call'),
multer = require('multer'),
{v4} = require('uuid'),
mongoose = require('mongoose'),
getAddress = require('./modules/address'),
Model = require('./models/models'),
client = require('twilio')(process.env.SID, process.env.KEY), 
encryptor = require('simple-encryptor')(process.env.PASS),
cors = require('cors'),
{join,extname} = require('path'),
port = process.env.PORT || 3000;

// Mongoose connect

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/Survelliance', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

// Multer
const storages = multer.diskStorage({ destination:process.env.UPLOADS || `./uploads`,filename: (req,file,callback) => callback(null,v4() + extname(file.originalname))})
const upload = multer({storages});


// Static path

app.use('/',express.static(join(__dirname,'serve', 'client')))
app.use('/dashboard',express.static(join(__dirname,'serve', 'publicc')))
app.use('/signup',express.static(join(__dirname,'serve', 'signup')))
app.use('/uploads', express.static(join(__dirname, '/uploads')));

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: '*'}))

// Routes

app.get('/api/:uname/:key', async (req, res) => {  
if(!((await Model.findOne({key:req.params.uname}))==null)) { 
if(req.params.key==encryptor.decrypt((await Model.findOne({key:req.params.uname})).value).password) res.json(encryptor.decrypt((await Model.findOne({key:req.params.uname})).value))
else authErr(res,req,loggerjs)
}
else res.status(404).send('404 Not Found')
})


app.post('/api/v1', async (req, res) => {
var mdl = { ... encryptor.decrypt((await Model.findOne({key:req.body.uname})).value)}
if(mdl.password==req.body.passwd){
req.body.data['coordAddress'] = await getAddress(req.body.data.lat,req.body.data.long,process.env.AKEY)
if(mdl['lasdata']) mdl['lasdata'].push(req.body.data)
else {
mdl['lasdata'] = [];
mdl['lasdata'].push(req.body.data)
}
Object.values(mdl.data).splice(4).forEach(num => call(num,mdl.data.name,mdl.lasdata.prior,loggerjs,client))
Model.findOneAndUpdate({ key:req.body.uname  },{ value:encryptor.encrypt(mdl) }).exec()
res.send('Yes Go Ahead')
}
else authErr(res,req,loggerjs)
})
app.post('/sign', async (req, res) => { 
if(!((await Model.findOne({key:req.body.username}))==null)) res.send('Oops username already exists')
else {
Model.findOneAndUpdate({ key:req.body.username  },{ value:encryptor.encrypt(req.body) }, {upsert:true, new: true }).exec()
res.send('Yup go ahead')
}})

app.post('/upload/:uname/:key',upload.array('image', 5),async   (req, res) => { 
if(!((await Model.findOne({key:req.params.uname}))==null)) {
if(req.params.key==encryptor.decrypt((await Model.findOne({key:req.params.uname})).value).password){
var mdl = { ... encryptor.decrypt((await Model.findOne({key:req.params.uname})).value)}
if(!req.files) res.status(400).send(Error('File Not Found'))
else {
mdl['images'] = req.files
Model.findOneAndUpdate({ key:req.params.uname  },{ value:encryptor.encrypt(mdl) }).exec()
res.send('Sucess')
}
}
}})


// Socket io

io.on('connection', socket => {
socket.username = '';
socket.channel = '/';
socket.on('join', ({ username, channel }) => {
socket.username = username;
socket.channel = channel;
socket.join(channel);
// socket.emit('message', { user: 'Info', msg: 'Welcome to dev talk', channel: socket.channel });
loggerjs.info( username + 'at '+ channel +' connected');
// socket.broadcast.to(channel).emit('message', { user: 'Info', msg: `${username} has joined` }); 
});
socket.on('radio', blob => {
socket.broadcast.emit('voice', blob);
});
socket.on('message', ({ user, msg }) => socket.to(socket.channel).emit('message', { user: user, msg: msg }));
socket.on('disconnect', ({ user }) => loggerjs.info(user+' user disconnected'));
});


// HTTP listen

http.listen(port, () => loggerjs(`Server running at ${port}`))
