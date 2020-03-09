const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        req.session.destroy();

        res.redirect(`${config.backend_url}login/?msg=logout`);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;