const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.render('contact-us');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/', async(req,res)=>{

    try{

        let {firstlastname_inp, email_inp, phonenumber_inp, title_inp, text_inp} = req.body;

        let firstlastname_valid = validation.isSafe(firstlastname_inp);
        let email_valid = validation.isEmail(email_inp);
        let phonenumber_valid = validation.isPhonenumber(phonenumber_inp);
        let title_valid = validation.isSafe(title_inp);
        let text_valid = validation.isSafe(text_inp);

        if(firstlastname_valid != ''){
            return res.redirect(`${config.frontend_url}contact-us/?msg=${firstlastname_valid}`);
        }
        else if(email_valid != ''){
            return res.redirect(`${config.frontend_url}contact-us/?msg=${email_valid}`);
        }
        else if(phonenumber_valid != ''){
            return res.redirect(`${config.frontend_url}contact-us/?msg=${phonenumber_valid}`);
        }
        else if(text_valid != ''){
            return res.redirect(`${config.frontend_url}contact-us/?msg=${text_valid}`);
        }
        else if(title_valid != ''){
            return res.redirect(`${config.frontend_url}contact-us/?msg=${title_valid}`);
        }
        else if(text_inp.length > 2000){
            return res.redirect(`${config.frontend_url}contact-us/?msg=limited-length`);
        }
        else{

            let new_message = {

                first_last_name : firstlastname_inp,
                email : email_inp,
                phone_number : phonenumber_inp,
                title : title_inp,
                text : text_inp,
                date : getCurrentDate(),
                read : false,
                reply : false

            }

            let result = await message_model.add(new_message);

            if(result){
                return res.redirect(`${config.frontend_url}contact-us/?msg=sent-success`);
            }
            else{
                return res.redirect(`${config.frontend_url}contact-us/?msg=sent-fail`);
            }

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;