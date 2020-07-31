// Application configuration and settings

let app_port = 3000;
let mongodb_port = 27017;
let address = `localhost`;
let db_name = `quince`;

module.exports = config = {

    port : app_port,
    frontend_url : `http://${address}:${app_port}/`,
    backend_url : `http://${address}:${app_port}/quince/`,
    mongodb_url : `mongodb://localhost:${mongodb_port}/${db_name}`,
    captcha_url : `http://${address}:${app_port}/captcha`,
    app_dir : require.main.path + '/',
    backend_tmp : 'quince',
    frontend_tmp : 'fashion',
    session_secret_key : 'rushteamquince',
    session_name : 'quince',
    debug_mode : true,
    captcha_color : `#0096ff`,
    image_limited_size : 5120,
    video_limited_size : 10024,
    other_limited_size : 100000024,

};

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