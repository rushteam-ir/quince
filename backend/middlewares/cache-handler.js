const router = express.Router();

router.use(async(req, res, next)=>{

    try{

        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        next();

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;