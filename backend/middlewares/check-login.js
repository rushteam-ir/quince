const router = express.Router();

router.use(async(req, res, next)=>{

    let parsed_url = req._parsedUrl.pathname;

    if(!parsed_url.endsWith('/')){

        parsed_url += '/';

    }

    if(isUndefined(req.session.admin_id)){

        // Admin is not logged in
        if(backend_allowd_urls.includes(parsed_url)){

            next();

        }
        else{

            res.redirect(`${config.backend_url}login`);
            return;

        }

    }
    else{

        // Admin is already logged in
        if(backend_allowd_urls.includes(parsed_url)){

            res.redirect(`${config.backend_url}dashboard`);
            return;

        }
        else{

            next();

        }

    }

});

module.exports = router;