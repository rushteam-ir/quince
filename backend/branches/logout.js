const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        req.session.destroy(function(err) {

            if(!err){

                res.redirect(`${config.backend_url}login/?msg=logout-success`);

            }
            else{

                res.redirect(`${config.backend_url}dashboard/?msg=logout-fail`);

            }

        })

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;