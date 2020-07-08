const router = express.Router()

router.use(async(req, res, next)=>{

    try{

        // Check last activity
        let find_user = await user_model.getById(req.session.admin_id);

        let user_data = {

            last_activity : getCurrentDate()

        }

        let result = await user_model.edit(req.session.admin_id, user_data);

        next()

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;