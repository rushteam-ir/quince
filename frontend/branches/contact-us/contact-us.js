const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.render('contact-us/contact-us');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/', async(req,res)=>{

    try{

        let {name_inp, email_inp, phone_number_inp, title_inp, text_inp} = req.body;

        let validation_result = new validation([
            {value : name_inp},
            {value : email_inp, type : 'email'},
            {value : phone_number_inp, type : 'phone'},
            {value : title_inp},
            {value : text_inp},
        ]).valid();

        if(validation_result){

            return res.json(validation_result);

        }

        let contact_data = {

            name : name_inp,
            email : email_inp,
            phone_number : phone_number_inp,
            title : title_inp,
            text : text_inp,

        }

        let result = await contact_model.add(contact_data);

        if(result){

            res.json({
                status : 'success',
                msg : 'پیام شما با موفقیت ثبت شد.',
                url : `${config.frontend_url}contact-us`
            });

        }
        else{

            res.json('درخواست شما با مشکل مواجه شده است.');

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;