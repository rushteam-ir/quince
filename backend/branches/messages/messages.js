const router = express.Router();

router.get('/', async(req,res)=>{

    try{

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