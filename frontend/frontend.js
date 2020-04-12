// Importing all requirements
require('./frontend-init');

// Main rout
frontend.use(async(req,res,next)=>{

    try{

        // Check last activity
        let find_me = await user_model.getById(req.session.admin_id);

        if(find_me){

            let admin_data = {
                last_activity : getCurrentDate()
            }

            await user_model.editProfile(req.session.admin_id, admin_data, (result)=>{

                if(result){
                    next();
                }else{
                    next();
                };

            });

        }
        else{
            next();
        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});


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
const about_us = require('./branches/about-us');
const contact_us = require('./branches/contact-us');
const product = require('./branches/product');
const user = require('./branches/user/user');

frontend.use('/captcha', captcha);
frontend.use('/about-us', about_us);
frontend.use('/contact-us', contact_us);
frontend.use('/product', product);
frontend.use('/user', user);

// Frontend 404 page
frontend.use(async(req,res,next)=>{

    res.status(404).render('404');

});

// Exporting module
module.exports = frontend;