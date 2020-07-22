const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.render('groups/groups-access');

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;