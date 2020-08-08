const router = express.Router();

router.get('/', async(req, res, next)=>{

    try {

        let user_id = req.query.id;
        let user_find = await user_model.getById(user_id);
        let back_url = req.header('Referer') || '/';

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

                    return res.redirect(`${back_url}`);

                }
                else{

                    return res.redirect(`${back_url}`);

                }

            }
            else{

                return res.redirect(`${back_url}`);

            }

        }
        else{

            return res.redirect(`${back_url}`);

        }

    }
    catch(error) {

        next(error);

    }

});

module.exports = router;