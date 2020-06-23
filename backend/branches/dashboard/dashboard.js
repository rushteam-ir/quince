const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{
        
        res.render('dashboard/dashboard');

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;