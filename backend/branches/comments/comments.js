const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        await serverHelpers.tableList(req, async (page_number, page_limit, data)=>{

            let search_inp = req.query.search;
            let author_inp = req.query.author;
            let id_inp = req.query.id;
            let query = null;

            if(!isUndefined(search_inp)){
                data.search = true;
                data.search_value = search_inp;
                data.pagination_url = `/?search=${search_inp}`;
            }
            else if(!isUndefined(author_inp)){
                data.pagination_url = `/?author=${author_inp}`;
                query = {author : author_inp};
            }
            else if(!isUndefined(id_inp)){
                data.pagination_url = `/?id=${id_inp}`;
                query = {_id : id_inp};
            }

            let comments_list = await comment_model.search(query, search_inp ? search_inp : null, page_number, page_limit);

            if(comments_list.list.length == 0 && comments_list.total_pages != 0){

                return res.redirect(`${config.backend_url}comments/?page=${comments_list.total_pages}`)

            }

            data.comments_list = comments_list.list;
            data.page_number = page_number;
            data.page_limit = page_limit;
            data.rows_begin_number = comments_list.rows_begin_number;
            data.total_pages = comments_list.total_pages;

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