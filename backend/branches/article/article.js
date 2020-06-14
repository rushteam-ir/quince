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
const delete_article = require('./api/delete-article');
const delete_select_article = require('./api/delete-select-article');
const search = require('./search');

router.use('/list', list);
router.use('/add', add);
router.use('/api/delete-article', delete_article);
router.use('/api/delete-select-article', delete_select_article);
router.use('/search', search);

module.exports = router;