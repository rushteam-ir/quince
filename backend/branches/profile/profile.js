const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.render('profile/profile');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/', async(req,res)=>{

    try{

        if(req.body.change_profile == ''){

            let {email_inp, firstname_inp, lastname_inp, phonenumber_inp} = req.body;

            let last_input = req.session.admin_info;
            let last_checkbox = '';

            if(req.body.author_type === 'on'){

                last_checkbox = 'email';

            }
            else{

                last_checkbox = 'name';

            }

            if(last_input.first_name == firstname_inp &&
                last_input.last_name == lastname_inp && last_input.email == email_inp &&
                last_input.phone_number == phonenumber_inp && last_input.author_type == last_checkbox &&
                !req.files){

                return res.redirect(`${config.backend_url}profile/?msg=no-change`);

            }

            let validation_result = new validation([
                {value : email_inp, type : 'email'},
                {value : firstname_inp},
                {value : lastname_inp},
                {value : phonenumber_inp , type : 'phone'},
            ]).valid();

            if(validation_result){

                return res.redirect(`${config.backend_url}profile/?msg=${validation_result}`);

            }

            if(req.body.author_type == 'on'){

                author_type = 'email';

            }
            else{

                author_type = 'name';

            }

            let admin_id = req.session.admin_id;
            let admin_data = {

                first_name : firstname_inp,
                last_name : lastname_inp,
                email : email_inp,
                phone_number : phonenumber_inp,
                author_type : author_type

            };

            if (req.files) {

                let uploader_options = {

                    allowed_formats : 'image',
                    limited_size : backend_limited_avatars_size,
                    file_path : `${backend_upload_dir}avatars/`,

                }

                let file_name = `${admin_id.toString()}.png`;
                let upload_result = new uploader(req.files.avatar, file_name, uploader_options).upload();

                if(upload_result){

                    return res.redirect(`${config.backend_url}profile/?msg=${upload_result}`);

                }

                admin_data.avatar = file_name;


            }

            let result = await user_model.editProfile(admin_id, admin_data);

            if(result){

                req.session.admin_info = result;
                backend.locals.admin_info = req.session.admin_info;

                return res.redirect(`${config.backend_url}profile/?msg=profile-success`);

            }
            else{

                return res.redirect(`${config.backend_url}profile/?msg=profile-fail`);

            }

        }
        else if(req.body.change_password == ''){

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

            let admin_id = req.session.admin_id;

            if(current_password === req.session.admin_info.password && new_password === confirm_password && new_password != "" && confirm_password != ""){

                let result = await user_model.editProfile(admin_id, admin_data);

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
        else {

            return res.redirect(`${config.backend_url}profile`);

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

const delete_avatar = require('./api/delete-avatar');

router.use('/api/delete-avatar', delete_avatar);

module.exports = router;