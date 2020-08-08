const router = express.Router();

router.get('/', async(req, res)=>{


    try{

        res.render('user/invoices/invoices');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

const show = require('./show');

router.use('/show', show);

module.exports = router;