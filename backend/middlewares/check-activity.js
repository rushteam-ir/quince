const router = express.Router()

router.use(async(req, res, next)=>{

    try{

        // Check last activity
        let find_user = await admin_model.getById(req.session.admin_id);

        let user_data = {

            last_activity : getCurrentDate()

        }

        let result = await admin_model.edit(req.session.admin_id, user_data);

        next()

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;