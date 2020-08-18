const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.render('contact us/contact-us');

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;