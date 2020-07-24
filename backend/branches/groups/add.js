const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let data = {

            access_list : await access_model.get()

        }

        res.render('groups/groups-add', data);

    }
    catch (error) {

        next(error);

    }

});

router.post('/', async(req, res, next)=>{

    try{

        let {email_inp, password_inp, confirm_password_inp, access_inp} = req.body;

        let validation_result = new validation([
            {value : email_inp, type : 'email'},
            {value : password_inp, type : 'password'},
            {value : confirm_password_inp , type : 'password'},
            {value : access_inp, type : 'objectId'},
        ]).valid()

        if(validation_result){

            return res.json(validation_result);

        }

        if(access_inp == '0'){

            return res.json('لطفا یک سطح دسترسی برای مدیر جدید انتخاب کنید.');

        }


        if(password_inp != confirm_password_inp){

            return res.json('رمز عبور و تکرار آن مشابه نیستند.');

        }

        let admin_data = {

            email : email_inp,
            password : password_inp,
            access_type : access_inp

        }

        let result = await admin_model.add(admin_data);

        if(result){

            return res.json({
                status : 'success',
                url : `${config.backend_url}groups/admins`,
                msg : `مدیر جدید با موفقیت ساخته شد`
            })

        }
        else{

            return res.json('این ایمیل تکراری می باشد، لطفا از نام دیگری استفاده کنید.')

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;