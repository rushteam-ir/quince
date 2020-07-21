// Importing all requirements
require('./backend-init');

// Backend Middlewares
const check_login = require('./middlewares/check-login');
const check_message = require('./middlewares/check-message');
const global_options = require('./middlewares/global-options');

backend.use(check_login);
backend.use(check_message);
backend.use(global_options);

// Backend Routs
const dashboard = require('./branches/dashboard/dashboard');
const login = require('./branches/login/login');
const profile = require('./branches/profile/profile');
const category = require('./branches/category/category');
const recovery = require('./branches/recovery/recovery');
const store = require('./branches/store/store');
const settings = require('./branches/settings/settings');
const logout = require('./branches/logout/logout');
const messages = require('./branches/messages/messages');
const groups = require('./branches/groups/groups');
const guide = require('./branches/guide/guide');
const article = require('./branches/article/article');
const files = require('./branches/files/files');
const api = require('./api/api');

backend.use('/dashboard', dashboard);
backend.use('/login', login);
backend.use('/profile', profile);
backend.use('/category', category);
backend.use('/recovery', recovery);
backend.use('/store', store);
backend.use('/settings', settings);
backend.use('/logout', logout);
backend.use('/messages', messages);
backend.use('/groups', groups);
backend.use('/guide', guide);
backend.use('/article', article);
backend.use('/files', files);
backend.use('/api', api);

// Redirect to dashboard rout
backend.get('/', async(req, res, next)=>{

    try{

        res.redirect(`${config.backend_url}dashboard`);

    }
    catch (error) {

        next(error);

    }

});

// Backend 404 page
backend.use(async (req, res, next)=>{

    res.status(404).render('errors/404');

});

// Backend 500 page
backend.use(async (error, req, res, next)=>{

    let new_report = {
        type : '500',
        text : error,
        url : req._parsedOriginalUrl.path,
        who : req.session.admin_id,
        remote_address : req.connection.remoteAddress,
    }

    await report_model.add(new_report);

    res.status(500).render('errors/500', {error});

});

// Exporting module
module.exports = backend;