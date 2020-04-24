const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.render('profile');

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

            let valid_firstname = validation.isSafe(firstname_inp);
            let valid_lastname = validation.isSafe(lastname_inp);
            let valid_email = validation.isEmail(email_inp);
            let valid_phonenumber = validation.isPhonenumber(phonenumber_inp);
            let author_type = 'name';

            if(valid_firstname != ''){

                return res.redirect(`${config.backend_url}profile`);

            }
            else if(valid_lastname != ''){

                return res.redirect(`${config.backend_url}profile`);

            }
            else if(valid_email != ''){

                return res.redirect(`${config.backend_url}profile`);

            }
            else if(valid_phonenumber != ''){

                return res.redirect(`${config.backend_url}profile`);

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

                let file_format1 = req.files.avatar.name.slice(-3).toLowerCase();
                let file_format2 = req.files.avatar.name.slice(-4).toLowerCase();

                if(backend_allowd_avatars.includes(file_format1) || backend_allowd_avatars.includes(file_format2)){

                    if(req.files.avatar.size/1024 <= backend_limited_avatars_size){

                        let avatar = req.files.avatar;
                        let avatar_path = `${backend_upload_dir}avatars/${admin_id.toString()}.png`;
                        avatar.mv(avatar_path, (err)=>{});
                        admin_data.avatar = `${admin_id.toString()}.png`

                    }
                    else{

                        return res.redirect(`${config.backend_url}profile/?msg=limited-avatar`);

                    }


                }
                else {

                    return res.redirect(`${config.backend_url}profile/?msg=illegal-avatar`);

                }


            }

            let result = await user_model.editProfile(admin_id, admin_data);

            if(result){

                req.session.admin_info = result;
                backend.locals.admin_info = req.session.admin_info;

                res.redirect(`${config.backend_url}profile/?msg=profile-success`);

            }
            else{

                res.redirect(`${config.backend_url}profile/?msg=profile-fail`);

            }

        }
        else if(req.body.change_password == ''){

            let {current_password, new_password, confirm_password} = req.body;
            let valid_currpass = validation.isPassword(current_password);
            let valid_newpass = validation.isPassword(new_password);
            let valid_conpass = validation.isPassword(confirm_password);

            if(valid_currpass != ''){

                return res.redirect(`${config.backend_url}profile`);

            }
            else if(valid_newpass != ''){

                return res.redirect(`${config.backend_url}profile`);

            }
            else if(valid_conpass != ''){

                return res.redirect(`${config.backend_url}profile`);

            }

            let admin_data = {

                password : new_password,

            };

            let admin_id = req.session.admin_id;

            if(current_password === req.session.admin_info.password && new_password === confirm_password && new_password != "" && confirm_password != ""){

                let result = await user_model.editProfile(admin_id, admin_data);

                if(result){

                    req.session.admin_info = result;

                    res.redirect(`${config.backend_url}profile/?msg=password-success`);

                }
                else{

                    res.redirect(`${config.backend_url}profile/?msg=password-fail`);

                }

            }
            else{

                res.redirect(`${config.backend_url}profile/?msg=incorrect-input`);

            }

        }
        else {

            res.redirect(`${config.backend_url}profile`);

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

const delete_avatar = require('./api/delete-avatar');

router.use('/api/delete-avatar', delete_avatar);

module.exports = router;