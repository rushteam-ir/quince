const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        await serverHelpers.tableList(req, async (page_number, page_limit, data)=>{

            let search_inp = req.query.search;
            let path_inp = req.query.path;
            let search_pagination = !isUndefined(search_inp) ? `/?search=${search_inp}` : '';
            let path_pagination = !isUndefined(path_inp) ? `/?path=${path_inp}` : '';
            let file_path = backend_upload_dir;

            if(!isUndefined(search_inp)) {
                data.search = true;
                data.search_value = search_inp;
            }
            if(!isUndefined(path_inp)) {
                file_path += (path_pagination == '') ?  '' : path_inp + '/';
            }

            data.pagination_url += search_pagination + path_pagination;

            let content_list = await fileManager.getPathContent(file_path, backend_upload_dir, page_number, page_limit);

            if(content_list.list.length == 0 && content_list.total_pages != 0){

                return res.redirect(`${config.backend_url}files/?page=${content_list.total_pages}`)

            }

            data.content_list = content_list.list;
            data.parent_directory = content_list.parent_directory;
            data.page_number = page_number;
            data.page_limit = page_limit;
            data.rows_begin_number = content_list.rows_begin_number;
            data.total_pages = content_list.total_pages;
            data.breadcrumb = content_list.breadcrumb;

            res.render('files/files', data);

        })

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;