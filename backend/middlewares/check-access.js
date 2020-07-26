const router = express.Router();

router.use(async(req, res, next)=>{

    try{

        let parsed_url = req._parsedUrl.pathname;

        if(!parsed_url.endsWith('/')){

            parsed_url += '/';

        }

        if(isUndefined(req.session.admin_info)){

            next();

        }
        else{

            let find_access_content = backend_access.content[parsed_url];
            let find_access_management = backend_access.management[parsed_url];

            if(isUndefined(find_access_content) && isUndefined(find_access_management)){

                next();

            }
            else{

                if(isUndefined(req.session.admin_info.access_type)){

                    return next();

                }
                if(req.session.admin_info.access_type == null){

                    return res.status(403).render('errors/403');

                }
                if(req.session.admin_info.access_type.values.includes(find_access_content) || req.session.admin_info.access_type.values.includes(find_access_management)){

                    next();

                }
                else{

                    res.status(403).render('errors/403');

                }

            }

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;