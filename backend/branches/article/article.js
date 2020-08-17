const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.redirect(`${config.backend_url}article/list`);

    }
    catch (error) {

        next(error);

    }

});

const delete_article = require('./api/delete-article');
const delete_select = require('./api/delete-select');
const change_status = require('./api/change-status');
const change_comments_status = require('./api/change-comments-status');

const list = require('./list');
const add = require('./add');
const edit = require('./edit');
const search = require('./search');
const get = require('./get');

router.use('/api/delete-article', delete_article);
router.use('/api/delete-select', delete_select);
router.use('/api/change-status', change_status);
router.use('/api/change-comments-status', change_comments_status);

router.use('/list', list);
router.use('/add', add);
router.use('/edit', edit);
router.use('/search', search);
router.use('/get', get);

module.exports = router;