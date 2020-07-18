const router = express.Router();

router.post('/', async(req, res, next)=>{

    try {

        let admin_id = req.session.admin_id;
        let last_input = req.session.admin_info;
        let {current_password, new_password, confirm_password} = req.body;

        let validation_result = new validation([
            {value : current_password, type : 'password'},
            {value : new_password, type : 'password'},
            {value : confirm_password, type : 'password'}
        ]).valid();

        if(validation_result){

            return res.json(validation_result)

        }

        let admin_data = {

            password : new_password,

        };

        if(current_password === req.session.admin_info.password && new_password === confirm_password && new_password != "" && confirm_password != ""){

            let result = await user_model.edit(admin_id, admin_data);

            if(result){

                req.session.admin_info = result;
                return res.json({
                    status : 'success',
                    msg : 'رمز عبور با موفقیت تعویض شد.'
                })

            }
            else{

                return res.json('درخواست شما با مشکل مواجه شده ، لطفا با پشتیبانی تماس حاصل فرمایید.')

            }

        }
        else{

            return res.json('رمز عبور فعلی اشتباه است و یا رمز عبور جدید و تکرار آن مشابه نیستند.')

        }

    }
    catch(error) {

        next(error);

    }

});

module.exports = router;