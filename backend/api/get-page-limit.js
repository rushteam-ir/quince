const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        req.session.limit = parseInt(req.body.limit);
        res.end();

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;