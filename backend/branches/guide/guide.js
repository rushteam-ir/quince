const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.render('guide');

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;