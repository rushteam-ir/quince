const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.render('groups/groups-add');

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;