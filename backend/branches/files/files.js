const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        await serverHelpers.tableList(req, async (page_number, page_limit, data)=>{

            let search_inp = req.query.search;
            let path_inp = req.query.path;
            let search_pagination = isUndefined(search_inp)

            if(!isUndefined(search_inp)) {
                data.search = true;
                data.search_value = search_inp;
            }

            data.pagination_url = `/?search=${search_inp}`;

            let category_list = await category_model.search(query, search_inp ? search_inp : null, page_number, page_limit);

            if(category_list.list.length == 0 && category_list.total_pages != 0){

                return res.redirect(`${config.backend_url}category/?page=${category_list.total_pages}`)

            }

            data.parent_list = await category_model.getParent();
            data.category_list = category_list.list;
            data.page_number = page_number;
            data.page_limit = page_limit;
            data.rows_begin_number = category_list.rows_begin_number;
            data.total_pages = category_list.total_pages;

            res.render('files/files', data);

        })

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;