// Application configuration and settings
let app_port = 3000;
let mongodb_port = 27017;
let address = `localhost`;
let db_name = `quince`;
BACK_URL = `http://${address}:${app_port}/quince/`;

module.exports = config = {

    port : app_port,
    frontend_url : `http://${address}:${app_port}/`,
    backend_url : `http://${address}:${app_port}/quince/`,
    mongodb_url : `mongodb://localhost:${mongodb_port}/${db_name}`,
    captcha_url : `http://${address}:${app_port}/captcha`,
    app_dir : require.main.path + '/',
    backend_tmp : 'quince',
    frontend_tmp : 'rush team',
    session_secret_key : 'rushteamquince',
    session_name : 'quince',
    debug_mode : true,
    captcha_color : `#0096ff`

};