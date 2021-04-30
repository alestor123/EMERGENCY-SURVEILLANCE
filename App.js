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

