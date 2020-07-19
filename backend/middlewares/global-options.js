const router = express.Router();

router.use(async(req, res, next)=>{

    try{

        if(!isUndefined(req.session.admin_info)){

            if(!isUndefined(req.session.admin_info.first_name)){

                res.locals.g_first_name = req.session.admin_info.first_name;
                res.locals.g_short_letter_name = req.session.admin_info.first_name.charAt(0);

            }
            if(!isUndefined(req.session.admin_info.nick_name)){

                res.locals.g_nick_name = req.session.admin_info.nick_name;
                res.locals.g_short_letter_nick_name = req.session.admin_info.nick_name.charAt(0);

            }
            if(!isUndefined(req.session.admin_info.author_type)){

                res.locals.g_author_type = req.session.admin_info.author_type;

            }

        }

        next();

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;