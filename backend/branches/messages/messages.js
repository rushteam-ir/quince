const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let result = await message_model.read();
        // Check if we have a new message
        let message_status = await message_model.check();

        if(message_status){

            backend.locals.messages_status = true;

        }
        else{

            backend.locals.messages_status = false;

        }

        let data = {

            list : message_model.get()

        }

        res.render('messages/messages', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.get('/:id', async(req,res)=>{

    try{

        res.render('messages/messages-show');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

const delete_message = require('./api/delete-message');

router.use('/api/delete-message', delete_message);

module.exports = router;