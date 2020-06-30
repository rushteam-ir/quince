const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{
        
        res.render('files/files');

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;