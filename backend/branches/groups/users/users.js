const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        await serverHelpers.tableList(req, async (page_number, page_limit, data)=>{

            let search_inp = req.query.search;
            let query = {access_type: { $exists: true }, access : 'user'};

            if(!isUndefined(search_inp)){
                data.search = true;
                data.search_value = search_inp;
                data.pagination_url = `/?search=${search_inp}`;
            }

            let admins_list = await user_model.search(query, search_inp ? search_inp : null, page_number, page_limit);

            if(admins_list.list.length == 0 && admins_list.total_pages != 0){

                return res.redirect(`${config.backend_url}groups/admins/?page=${admins_list.total_pages}`)

            }

            data.access_list = await access_model.getList();
            data.admins_list = admins_list.list;
            data.page_number = page_number;
            data.page_limit = page_limit;
            data.rows_begin_number = admins_list.rows_begin_number;
            data.total_pages = admins_list.total_pages;

            res.render('groups/groups-users', data);

        })

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;