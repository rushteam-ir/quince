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

            res.render('comments/comments', data);

        })

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;