const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.render('settings');

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;