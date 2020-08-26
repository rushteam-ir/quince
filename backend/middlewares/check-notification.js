const router = express.Router();

router.use(async(req, res, next)=>{

    try{

        res.locals.g_notification_comments = await comment_model.getNotifications();
        res.locals.g_notification_contacts = await contact_model.getNotifications();

        next();

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;