// Application configuration and settings
let app_port = 3000;
let mongodb_port = 27017;
let address = `localhost`;
BACK_URL = `http://${address}:${app_port}/admin/`;

module.exports = config = {

    port : app_port,
    frontend_url : `http://${address}:${app_port}/`,
    backend_url : `http://${address}:${app_port}/admin/`,
    mongodb_url : `mongodb://localhost:${mongodb_port}/cms`,
    captcha_url : `http://${address}:${app_port}/captcha`,
    app_dir : require.main.path + '/',
    backend_tmp : 'zend',
    session_secret_key : 'polybiusmeganoob24',
    session_name : 'zend-cms',
    debug_mode : true,
    captcha_color : `#33228c`

};

module.exports = backend_branches = [];