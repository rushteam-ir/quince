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

        if(req.body.change_profile){

            let {firstname_inp, lastname_inp, email_inp, phonenumber_inp} = req.body;
            let admin_id = req.session.admin_id;
            let admin_data = {

                first_name : firstname_inp,
                last_name : lastname_inp,
                email : email_inp,
                phone_number : phonenumber_inp,

            };

            if (req.files) {

                if(backend_allowd_avatars.includes(req.files.avatar.name.slice(-3)) || backend_allowd_avatars.includes(req.files.avatar.name.slice(-4))){

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

            await admin_model.editProfile(admin_id, admin_data, (result)=>{

                if(result){

                    req.session.admin_info = result;
                    backend.locals.admin_info = req.session.admin_info;

                    res.redirect(`${config.backend_url}profile/?msg=edit-success`);

                }
                else{

                    res.redirect(`${config.backend_url}profile/?msg=edit-fail`);

                }

            })

        }
        else if(req.body.change_password){

            let {current_password, new_password, confirm_password} = req.body;
            let admin_data = {

                password : new_password,

            };
            let admin_id = req.session.admin_id;

            if(current_password === req.session.admin_info.password && new_password === confirm_password && new_password != "" && confirm_password != ""){

                await admin_model.editProfile(admin_id, admin_data, (result)=>{

                    if(result){

                        req.session.admin_info = result;

                        res.redirect(`${config.backend_url}profile/?msg=edit-success`);

                    }
                    else{

                        res.redirect(`${config.backend_url}profile/?msg=edit-fail`);

                    }

                })

            }
            else{

                res.redirect(`${config.backend_url}profile/?msg=incorrect-input`);

            }

        }
        else {

            res.redirect(`${config.backend_url}profile/?msg=error`);

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;