const router = express.Router();

router.use(async(req, res, next)=>{

    try{

        req.session.limit = parseInt(req.query.limit);

        next();

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;