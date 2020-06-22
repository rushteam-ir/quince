const router = express.Router()

router.use(async(req,res,next)=>{

    try{

        // Check last activity
        let find_user = await user_model.getById(req.session.admin_id);

        if(find_user){

            let user_data = {

                last_activity : getCurrentDate()

            }

            let result = await user_model.edit(req.session.admin_id, user_data);

            if(result){

                next();

            }
            else{

                next();

            };

        }
        else{

            next();

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;