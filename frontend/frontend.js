// Importing all requirements
require('./frontend-init');

// Main rout
frontend.use(async(req,res,next)=>{

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

frontend.get('/', async(req,res)=>{

    try{

        res.render('index');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

// Frontend other routs
const captcha = require('./branches/captcha');

frontend.use('/captcha', captcha);

// Frontend 404 page
frontend.use(async(req,res,next)=>{

    res.status(404).render('404');

});

// Exporting module
module.exports = frontend;