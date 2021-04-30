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
