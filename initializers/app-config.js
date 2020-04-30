// Application configuration and settings
let app_port = 3000;
let mongodb_port = 27017;
let address = `192.168.1.100`;
let db_name = `toffee`;
BACK_URL = `http://${address}:${app_port}/admin/`;

module.exports = config = {

    port : app_port,
    frontend_url : `http://${address}:${app_port}/`,
    backend_url : `http://${address}:${app_port}/admin/`,
    mongodb_url : `mongodb://localhost:${mongodb_port}/${db_name}`,
    captcha_url : `http://${address}:${app_port}/captcha`,
    app_dir : require.main.path + '/',
    backend_tmp : 'toffee',
    frontend_tmp : 'melorin',
    session_secret_key : 'toffeepolybius24',
    session_name : 'toffee',
    debug_mode : true,
    captcha_color : `#33228c`

};