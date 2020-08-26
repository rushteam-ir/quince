require('./backend-init');

const check_login = require('./middlewares/check-login');
const check_message = require('./middlewares/check-message');
const global_options = require('./middlewares/global-options');
const check_access = require('./middlewares/check-access');
const cache_handler = require('./middlewares/cache-handler');
const check_notification = require('./middlewares/check-notification');

backend.use(check_login);
backend.use(global_options);
backend.use(check_message);
backend.use(check_access);
backend.use(cache_handler);
backend.use(check_notification);

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
const comments = require('./branches/comments/comments');
const contacts = require('./branches/contacts/contacts');
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
backend.use('/comments', comments);
backend.use('/contacts', contacts);
backend.use('/api', api);

backend.get('/', async(req, res, next)=>{

    try{

        res.redirect(`${config.backend_url}dashboard`);

    }
    catch (error) {

        next(error);

    }

});

backend.use(async (req, res, next)=>{

    res.status(404).render('errors/404');

});

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

module.exports = backend;