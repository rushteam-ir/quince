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

        if(current_password === req.session.admin_info.password){

            if(new_password === confirm_password){

                let result = await admin_model.edit(admin_id, admin_data);

                if(result){

                    req.session.admin_info = result;
                    return res.json({
                        status : 'success',
                        url : `${config.backend_url}profile`,
                        msg : 'رمز عبور شما با موفقیت تعویض شد.'
                    })

                }
                else{

                    return res.json('درخواست شما با مشکل مواجه شده است.')

                }

            }
            else{

                return res.json('رمز عبور جدید و تکرار آن مشابه نیستند.');

            }

        }
        else{

            return res.json('رمز عبور فعلی اشتباه است.');

        }

    }
    catch(error) {

        next(error);

    }

});

module.exports = router;