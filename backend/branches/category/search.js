const router = express.Router();

router.get('/:search', async(req,res)=>{

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

        let category_list = await category_model.search(search_value, page_number, page_limit)

        let data = {

            parent_list : await category_model.getParent(),
            category_list : category_list.list,
            page_number : page_number,
            page_limit : page_limit,
            rows_begin_number : category_list.rows_begin_number,
            total_pages : category_list.total_pages,
            search : true,
            search_value : search_value

        };

        res.render('category/category', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;