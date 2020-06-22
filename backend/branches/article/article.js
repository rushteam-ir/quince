const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.redirect(`${config.backend_url}article/list`);

    }
    catch (error) {

        next(error);

    }

});

const list = require('./list');
const add = require('./add');
const edit = require('./edit');
const search = require('./search');
const delete_article = require('./api/delete-article');
const delete_select_article = require('./api/delete-select-article');
const change_status_article = require('./api/change-status-article');
const change_comments_status_article = require('./api/change-comments-status-article');
const delete_main_image_article = require('./api/delete-main-image-article');

router.use('/list', list);
router.use('/add', add);
router.use('/edit', edit);
router.use('/search', search);
router.use('/api/delete-article', delete_article);
router.use('/api/delete-select-article', delete_select_article);
router.use('/api/change-status-article', change_status_article);
router.use('/api/change-comments-status-article', change_comments_status_article);
router.use('/api/delete-main-image-article', delete_main_image_article);

module.exports = router;