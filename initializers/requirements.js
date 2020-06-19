// Server all requirements and modules
express = require('express');
dust_options = require('./dust');
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
compression = require('compression')

// Database all models
user_model = require('../models/user-schema');
category_model = require('../models/category-schema');
setting_model = require('../models/setting-schema');
product_model = require('../models/product-schema');
message_model = require('../models/message-schema');
discount_model = require('../models/discount-schema');
article_model = require('../models/article-schema');