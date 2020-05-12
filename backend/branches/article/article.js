const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.redirect(`${config.backend_url}article/list`);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

const list = require('./list');
const add = require('./add');

router.use('/list', list);
router.use('/add', add);

module.exports = router;