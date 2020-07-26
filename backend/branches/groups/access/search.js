const router = express.Router();

router.get('/:search', async(req, res, next)=>{

    try{

        let search_value = req.params.search;

        await serverHelpers.tableList(req, async (page_number, page_limit, can_edit)=>{

            let access_list = await access_model.search(search_value, page_number, page_limit)

            if(access_list.list.length == 0 && access_list.total_pages != 0){

                return res.redirect(`${config.backend_url}groups/access/search/${search_value}/?page=${access_list.total_pages}`)

            }

            let data = {

                access_list : access_list.list,
                page_number : page_number,
                page_limit : page_limit,
                rows_begin_number : access_list.rows_begin_number,
                total_pages : access_list.total_pages,
                search : true,
                search_value : search_value

            };

            res.render('groups/groups-access', data);

        })

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;