const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let data = {

            admin_info : req.session.admin_info,

        }

        res.render('profile/profile', data);

    }
    catch (error) {

        next(error);

    }

});

router.post('/', async(req, res, next)=>{

    try{

        let admin_id = req.session.admin_id;
        let last_input = req.session.admin_info;

        if(req.body.profile_info == ''){

            let {first_name_inp, last_name_inp, nick_name_inp, email_inp, phone_number_inp} = req.body;

            let last_check_box = '';
            let author_type = '';

            if(req.body.author_type === 'on'){

                last_check_box = 'nick_name';

            }
            else{

                last_check_box = 'name';

            }

            if(last_input.first_name == first_name_inp && last_input.nick_name == nick_name_inp &&
                last_input.last_name == last_name_inp && last_input.email == email_inp &&
                last_input.phone_number == phone_number_inp && last_input.author_type == last_check_box &&
                !req.files){

                return res.redirect(`${config.backend_url}profile/?msg=no-change`);

            }

            let validation_result = new validation([
                {value : email_inp, type : 'email'},
                {value : first_name_inp},
                {value : last_name_inp},
                {value : nick_name_inp},
                {value : phone_number_inp , type : 'phone'},
            ]).valid();

            if(validation_result){

                return res.redirect(`${config.backend_url}profile/?msg=${validation_result}`);

            }

            if(req.body.author_type == 'on'){

                author_type = 'nick_name';

            }
            else{

                author_type = 'name';

            }

            let admin_data = {

                first_name : first_name_inp,
                last_name : last_name_inp,
                nick_name : nick_name_inp,
                email : email_inp,
                phone_number : phone_number_inp,
                author_type : author_type

            };

            if (req.files) {

                let file_name = `${randomSha1String()}.${req.files.avatar.name.split(".").pop()}`;

                let upload_result = fileManager.upload(req.files.avatar, file_name,{

                    allowed_formats : 'image',
                    limited_size : backend_limited_images_size,
                    file_path : `${backend_upload_dir}avatars/`,

                });

                if(upload_result){

                    return res.redirect(`${config.backend_url}profile/?msg=${upload_result}`);

                }

                admin_data.avatar = file_name;

            }

            let result = await user_model.edit(admin_id, admin_data);
            log(result)

            if(result){

                req.session.admin_info = result;
                return res.redirect(`${config.backend_url}profile/?msg=profile-success`);

            }
            else{

                return res.redirect(`${config.backend_url}profile/?msg=profile-fail`);

            }

        }
        else if(req.body.profile_private == ''){

            let {day_inp, month_inp, year_inp, country_inp, city_inp, bio_inp} = req.body;
            let date = `${year_inp}/${month_inp}/${day_inp}`;

            if(last_input.birth_day == day_inp && last_input.birth_month == month_inp &&
                last_input.birth_year == year_inp && last_input.country == country_inp &&
                last_input.city == city_inp && last_input.biography == bio_inp){

                return res.redirect(`${config.backend_url}profile/?msg=no-change`);

            }

            let validation_result = new validation([
                {value : date , type : 'date'},
                {value : country_inp},
                {value : city_inp},
                {value : bio_inp},
            ]).valid();

            if(validation_result){

                return res.redirect(`${config.backend_url}profile/?msg=${validation_result}`);

            }

            let admin_data = {

                birth_day : day_inp,
                birth_month : month_inp,
                birth_year : year_inp,
                country : country_inp,
                city : city_inp,
                biography : bio_inp,

            };

            let result = await user_model.edit(admin_id, admin_data);

            if(result){

                req.session.admin_info = result;
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
        else if(req.body.profile_reset == ''){

            return res.redirect(`${config.backend_url}profile`);

        }
        else {

            return res.redirect(`${config.backend_url}profile`);

        }

    }
    catch (error) {

        next(error);

    }

});

const delete_avatar_profile = require('./api/delete-avatar-profile');

router.use('/api/delete-avatar-profile', delete_avatar_profile);

module.exports = router;