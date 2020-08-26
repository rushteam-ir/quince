const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        req.session.destroy(function(err) {

            if(!err){

                return res.redirect(`${config.backend_url}login`);

            }
            else{

                return res.redirect(`${config.backend_url}dashboard`);

            }

        })

    }
    catch (error) {

        rnext(error);

    }

});

module.exports = router;