// Importing all requirements
require('./backend-init');

// Main rout

backend.use(async(req,res,next)=>{

    try{

        // Check last activity
        let find_user = await user_model.getById(req.session.admin_id);

        if(find_user){

            let user_data = {

                last_activity : getCurrentDate()

            }

            let result = await user_model.editProfile(req.session.admin_id, user_data);

            if(result){

                next();

            }
            else{

                next();

            };

        }
        else{

            next();

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

backend.use(async(req,res,next)=>{

    try{

        // Check if we have a new message
        let message_status = await message_model.check();

        if(message_status){

            backend.locals.messages_status = true;

        }
        else{

            backend.locals.messages_status = false;

        }

        // Check query
        if(req.query.msg){

            msg_param = req.query.msg.trim();

        }
        else{

            msg_param = '';

        }

        next();

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});


backend.use(async(req, res, next)=>{

    let parsed_url = req._parsedUrl.pathname;

    if(!parsed_url.endsWith('/')){

        parsed_url += '/';

    }

    if(isUndefined(req.session.admin_id)){

        // Admin is not logged in
        if(backend_allowd_urls.includes(parsed_url)){

            next();

        }
        else{

            res.redirect(`${config.backend_url}login`);
            return;

        }

    }
    else{

        // Admin is already logged in
        if(backend_allowd_urls.includes(parsed_url)){

            res.redirect(`${config.backend_url}dashboard`);
            return;

        }
        else{

            next();

        }

    }

});

backend.get('/', async(req,res)=>{

    try{

        res.redirect(`${config.backend_url}dashboard`);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

// Backend other routs
const dashboard = require('./branches/dashboard');
const login = require('./branches/login/login');
const profile = require('./branches/profile/profile');
const category = require('./branches/category/category');
const recovery = require('./branches/recovery/recovery');
const store = require('./branches/store/store');
const settings = require('./branches/settings');
const logout = require('./branches/logout');
const messages = require('./branches/messages/messages');
const users = require('./branches/users/users');
const guide = require('./branches/guide');
const article = require('./branches/article/article');

backend.use('/dashboard', dashboard);
backend.use('/login', login);
backend.use('/profile', profile);
backend.use('/category', category);
backend.use('/recovery', recovery);
backend.use('/store', store);
backend.use('/settings', settings);
backend.use('/logout', logout);
backend.use('/messages', messages);
backend.use('/users', users);
backend.use('/guide', guide);
backend.use('/article', article);

// Backend 404 page
backend.use(async(req,res,next)=>{

    res.status(404).render('404');

});

// Exporting module
module.exports = backend;