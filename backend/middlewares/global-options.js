const router = express.Router();

router.use(async(req, res, next)=>{

    try{

        res.locals.global = {

            admin_info : req.session.admin_info,
            short_letter_nick_name : req.session.admin_info.nick_name.charAt(0),
            short_letter_name : req.session.admin_info.first_name.charAt(0),

        }

        next();

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;