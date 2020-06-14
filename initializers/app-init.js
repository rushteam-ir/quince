// Server all requirements
express = require('express');
dust_options = require('./dust-helpers');
validation = require('./validation');
uploader = require('./uploader');
fs = require('fs');
adaro = require('adaro');
svg_captcha = require('svg-captcha');
session = require('express-session');
body_parser = require('body-parser');
file_upload = require('express-fileupload');
mongo_store = require('connect-mongo')(session);
mongoose = require('mongoose');
nodemailer = require('nodemailer');
JalaliDate = require('jalali-date');
sha1 = require('sha1');

user_model = require('../models/user-schema');
category_model = require('../models/category-schema');
setting_model = require('../models/setting-schema');
product_model = require('../models/product-schema');
message_model = require('../models/message-schema');
discount_model = require('../models/discount-schema');
article_model = require('../models/article-schema');

// Global variables
msg_param = '';

// Connect to MongoDB
mongoose.connect(config.mongodb_url, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false,
    useCreateIndex : true

});

// Session configuration
session_options = {

    store : new mongo_store({url : config.mongodb_url}),
    secret: config.session_secret_key,
    name : config.session_name,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 365*24*60*60}

};

// Mail transporter
transporter = nodemailer.createTransport({
    service: 'Zoho',
    auth: {
        user: 'zendcms@zohomail.com',
        pass: 'rsabz1999'
    }
});