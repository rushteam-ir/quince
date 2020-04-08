const router = express.Router();

router.get('/', async(req,res)=>{

    try {

        let user_id = req.query.id;
        let user_find = await user_model.getById(user_id);

        if(isObjectId(user_id)){

            if(user_find){

                let user_data = {status : true};

                if(user_find.status){

                    user_data.status = false;

                }
                else{

                    user_data.status = true;

                }

                await user_model.editProfile(user_find._id, user_data, (result)=>{

                    if(result){

                        return res.redirect(`${config.backend_url}users/list/?msg=change-success`);

                    }
                    else{

                        return res.redirect(`${config.backend_url}users/list/?msg=change-fail`);

                    }

                })

            }
            else{

                return res.redirect(`${config.backend_url}users/list/?msg=error`);

            }

        }
        else{

            return res.redirect(`${config.backend_url}users/list/?msg=error`);

        }

    }
    catch(err) {

        res.redirect(`${config.backend_url}profile/?msg=delete-fail`);

    }

});

module.exports = router;