const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        req.session.destroy(function(err) {

            if(!err){

                res.redirect(`${config.backend_url}login/?msg=logout-success`);

            }
            else{

                res.redirect(`${config.backend_url}dashboard`);

            }

        })

    }
    catch (error) {

        rnext(error);

    }

});

module.exports = router;