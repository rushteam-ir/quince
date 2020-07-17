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

            return res.redirect(`${config.backend_url}profile/?msg=${validation_result}`);

        }

        let admin_data = {

            password : new_password,

        };

        if(current_password === req.session.admin_info.password && new_password === confirm_password && new_password != "" && confirm_password != ""){

            let result = await user_model.edit(admin_id, admin_data);

            if(result){

                req.session.admin_info = result;
                return res.redirect(`${config.backend_url}profile/?msg=password-success`);

            }
            else{

                return res.redirect(`${config.backend_url}profile/?msg=password-fail`);

            }

        }
        else{

            return res.redirect(`${config.backend_url}profile/?msg=incorrect-input`);

        }

    }
    catch(error) {

        next(error);

    }

});

module.exports = router;