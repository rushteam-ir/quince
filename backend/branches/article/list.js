const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let search_inp = req.params.search;

        await serverHelpers.tableList(req, async (page_number, page_limit, can_edit)=>{

            let article_list;

            if(!isUndefined(search_inp)){
                article_list = await article_model.search(search_inp, page_number, page_limit)
            }
            else{
                article_list = await article_model.getAll(page_number, page_limit)
            }

            if(article_list.list.length == 0 && article_list.total_pages != 0){

                return res.redirect(`${config.backend_url}article/list/?page=${article_list.total_pages}`)

            }

            let data = {

                article_list : article_list.list,
                page_number : page_number,
                page_limit : page_limit,
                rows_begin_number : article_list.rows_begin_number,
                total_pages : article_list.total_pages,
                can_edit : can_edit,
                search : false,
                pagination_url : `/`

            };

            if(!isUndefined(search_inp)){
                data.search = true;
                data.search_value = search_inp;
                data.pagination_url = `/?search=${search_inp}`
            }


            res.render('article/article-list', data);

        })

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;