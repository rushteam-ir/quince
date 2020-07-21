const router = express.Router();

router.get('/:search', async(req, res, next)=>{

    try{

        let page_number = 1;
        let page_limit = req.session.limit;
        let search_value = req.params.search;

        if(req.query.page){

            page_number = parseInt(req.query.page);

            if(page_number <= 0){

                page_number = 1;

            }

        }
        if(!req.session.limit){

            page_limit = 10;

        }

        let admins_list = await admin_model.search(search_value, page_number, page_limit)

        if(admins_list.list.length == 0 && admins_list.total_pages != 0){

            return res.redirect(`${config.backend_url}groups/admins/search/${search_value}/?page=${admins_list.total_pages}`)

        }

        let data = {

            admins_list : admins_list.list,
            page_number : page_number,
            page_limit : page_limit,
            rows_begin_number : admins_list.rows_begin_number,
            total_pages : admins_list.total_pages,
            search : true,
            search_value : search_value

        };

        res.render('groups/groups-admins', data);

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;