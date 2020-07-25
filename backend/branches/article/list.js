const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let page_number = 1;
        let page_limit = req.session.limit;
        let can_edit = false;
        if(!isUndefined(req.session.admin_info.supportKey)){
            can_edit = true;
        }
        else{
            can_edit = (req.session.admin_info.access_type.values.includes('ویرایش مقاله ها')) ? true : false;
        }

        if(req.query.page){

            page_number = parseInt(req.query.page);

            if(page_number <= 0){

                page_number = 1;

            }

        }
        if(!req.session.limit){

            page_limit = 10;

        }

        let article_list = await article_model.getAll(page_number, page_limit)

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
            admin_id : req.session.admin_id,
            search : false,

        };

        res.render('article/article-list', data);

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;