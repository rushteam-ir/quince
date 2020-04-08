const router = express.Router();

router.get('/', async(req,res)=>{

    try {

        let user_id = req.query.id;
        let admin_find = await admin_model.getById(user_id);
        //let user_find = await admin_model.getById(user_id);

        if(isObjectId(user_id)){

            if(admin_find){

                // It is Admin
                let admin_data = {status : true};

                if(admin_find.status){

                    admin_data.status = false;

                }
                else{

                    admin_data.status = true;

                }

                admin_model.editProfile(admin_find._id, admin_data, (result)=>{

                    if(result){

                        res.redirect(`${config.backend_url}users/list/?msg=change-success`);

                    }
                    else{

                        res.redirect(`${config.backend_url}users/list/?msg=change-fail`);

                    }

                })

            }
            else{

                // Normal User

            }

        }


    }
    catch(err) {

        res.redirect(`${config.backend_url}profile/?msg=delete-fail`);

    }

});

module.exports = router;