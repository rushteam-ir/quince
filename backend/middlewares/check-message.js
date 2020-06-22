const router = express.Router();

router.use(async(req, res, next)=>{

    try{

        // Check if we have a new message
        let message_status = await message_model.check();

        if(message_status){

            backend.locals.messages_status = true;

        }
        else{

            backend.locals.messages_status = false;

        }

        // Check query
        if(req.query.msg){

            msg_param = req.query.msg.trim();

        }
        else{

            msg_param = '';

        }

        next();

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;