const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.render('dashboard');

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;