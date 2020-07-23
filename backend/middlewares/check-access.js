const router = express.Router();

router.use(async(req, res, next)=>{

    try{

        next()

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;