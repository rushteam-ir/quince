const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{
        
        res.render('comments/comments');

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;