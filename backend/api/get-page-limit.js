const router = express.Router();

router.post('/', async(req,res)=>{

    try{

        req.session.limit = parseInt(req.body.limit);

        res.redirect(req.body.url);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;