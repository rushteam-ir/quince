// Server all requirements
express = require('express');
fs = require('fs');
adaro = require('adaro');
svg_captcha = require('svg-captcha');
session = require('express-session');
body_parser = require('body-parser');
file_upload = require('express-fileupload');
mongo_store = require('connect-mongo')(session);
express_validator = require('express-validator');
mongoose = require('mongoose');
nodemailer = require('nodemailer');
JalaliDate = require('jalali-date');
user_model = require('../models/user-schema');
category_model = require('../models/category-schema');
setting_model = require('../models/setting-schema');
product_model = require('../models/product-schema');
message_model = require('../models/message-schema');

// Global variables
msg_param = '';

// Connect to MongoDB
mongoose.connect(config.mongodb_url, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false,
    useCreateIndex : true

});

// Dust configuration
dust_options = {

    cache : false,
    helpers : ['dustjs-helpers',

        function (dust) {
            dust.helpers.alertError = function (chunk, context, bodies, params) {

                if(msg_param === context.resolve(params.key)){

                    let html = `<div class="error_danger_alert text-right" id="error_field_danger"> <i class="fal fa-times d-inline-block remove_error_icon" onclick="removeDangerError()"></i> <i class="fal fa-exclamation-circle alert_icon_error"></i> <div class="d-inline-block mr-1">${context.resolve(params.msg)}</div> </div>`;

                    body = bodies.block;
                    chunk.write(html);
                    chunk.render(body, context);
                    return chunk;

                }

            },

            dust.helpers.alertSuccess = function (chunk, context, bodies, params) {

                if(msg_param === context.resolve(params.key)){

                    let html = `<div class="error_success_alert text-right" id="error_field_success"> <i class="fal fa-times d-inline-block remove_error_icon" onclick="removeSuccessError()"></i> <i class="fal fa-exclamation-circle alert_icon_error"></i> <div class="d-inline-block mr-1" id="error_text">${context.resolve(params.msg)}</div> </div>`;

                    body = bodies.block;
                    chunk.write(html);
                    chunk.render(body, context);
                    return chunk;

                }

            },

            dust.helpers.alertWarn = function (chunk, context, bodies, params) {

                if(msg_param === context.resolve(params.key)){

                    let html = `<div class="error_warning_alert text-right" id="error_field_warning"> <i class="fal fa-times d-inline-block remove_error_icon" onclick="removeWarningError()"></i> <i class="fal fa-exclamation-circle alert_icon_error"></i> <div class="d-inline-block mr-1">${context.resolve(params.msg)}</div> </div>`;

                    body = bodies.block;
                    chunk.write(html);
                    chunk.render(body, context);
                    return chunk;

                }

            }

        }

    ]

};

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