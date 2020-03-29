// Importing all requirements
require('./backend-init');

// Main rout
backend.use(async(req,res,next)=>{

    try{

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
        backend.locals.admin_info = req.session.admin_info;

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
const login = require('./branches/login');
const profile = require('./branches/profile');
const category = require('./branches/category');
const recovery = require('./branches/recovery');
const store = require('./branches/store');
const settings = require('./branches/settings');
const logout = require('./branches/logout');
const messages = require('./branches/messages');

backend.use('/dashboard', dashboard);
backend.use('/login', login);
backend.use('/profile', profile);
backend.use('/category', category);
backend.use('/recovery', recovery);
backend.use('/store', store);
backend.use('/settings', settings);
backend.use('/logout', logout);
backend.use('/messages', messages);

// Backend 404 page
backend.use(async(req,res,next)=>{

    res.status(404).render('404');

});

// Exporting module
module.exports = backend;