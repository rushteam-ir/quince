const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        await serverHelpers.tableList(req, async (page_number, page_limit, can_edit)=>{

            let comments_list = await comment_model.getAll(page_number, page_limit)

            if(comments_list.list.length == 0 && comments_list.total_pages != 0){

                return res.redirect(`${config.backend_url}comments/?page=${comments_list.total_pages}`)

            }

            let data = {

                comments_list : comments_list.list,
                page_number : page_number,
                page_limit : page_limit,
                rows_begin_number : comments_list.rows_begin_number,
                total_pages : comments_list.total_pages,
                can_edit : can_edit,
                search : false,

            };

            log(data.comments_list);

            res.render('comments/comments', data);

        })

    }
    catch (error) {

        next(error);

    }

});

const delete_comment = require('./api/delete-comment');
const delete_select = require('./api/delete-select');
const change_status = require('./api/change-status');
const accept_select = require('./api/accept-select');
const get_comment = require('./api/get-comment');

const reply = require('./reply');
const edit = require('./edit');

router.use('/api/delete-comment', delete_comment);
router.use('/api/delete-select', delete_select);
router.use('/api/change-status', change_status);
router.use('/api/accept-select', accept_select);
router.use('/api/get-comment', get_comment);

router.use('/reply', reply);
router.use('/edit', edit);

module.exports = router;