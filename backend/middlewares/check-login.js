const router = express.Router();

router.use(async(req, res, next)=>{

    try{

        let parsed_url = req._parsedUrl.pathname;

        if(!parsed_url.endsWith('/')){

            parsed_url += '/';

        }

        if(isUndefined(req.session.admin_id)){

            if(backend_allowd_urls.includes(parsed_url)){

                next();

            }
            else{

                return res.redirect(`${config.backend_url}login`);

            }

        }
        else{

            if(backend_allowd_urls.includes(parsed_url)){

                return res.redirect(`${config.backend_url}dashboard`);

            }
            else{

                next();

            }

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;