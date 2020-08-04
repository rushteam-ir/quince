const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let data = {

            list : 'await user_model.get()'

        }

        res.render('groups/groups-users', data);

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;