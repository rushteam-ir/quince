const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.send('hi')

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

const get_page_limit = require('./get-page-limit');

router.use('/get-page-limit', get_page_limit);

module.exports = router;