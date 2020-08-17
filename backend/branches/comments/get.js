const router = express.Router();

router.get('/:id', async(req, res, next)=>{

    try{

        let _id = req.params.id;

        await serverHelpers.tableList(req, async (page_number, page_limit, can_edit)=>{

            let comments_list = await comment_model.searchId(_id, page_number, page_limit)

            if(comments_list.list.length == 0 && comments_list.total_pages != 0){

                return res.redirect(`${config.backend_url}comments/get/${_id}/?page=${comments_list.total_pages}`)

            }

            let data = {

                comments_list : comments_list.list,
                page_number : page_number,
                page_limit : page_limit,
                rows_begin_number : comments_list.rows_begin_number,
                total_pages : comments_list.total_pages,
                can_edit : can_edit,
                search : false,
                pagination_url : `/get/${_id}`

            };

            res.render('comments/comments', data);

        })

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;