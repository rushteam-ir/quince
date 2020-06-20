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

                let result = user_model.edit(user_find._id, user_data);

                if(result){

                    return res.redirect(`${config.backend_url}users/list`);

                }
                else{

                    return res.redirect(`${config.backend_url}users/list`);

                }

            }
            else{

                return res.redirect(`${config.backend_url}users/list`);

            }

        }
        else{

            return res.redirect(`${config.backend_url}users/list`);

        }

    }
    catch(error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;