const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.render('messages/messages');

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

module.exports = router;