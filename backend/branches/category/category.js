const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        await serverHelpers.tableList(req, async (page_number, page_limit, data)=>{

            let search_inp = req.query.search;
            let author_inp = req.query.author;
            let query = null;

            if(!isUndefined(search_inp)){
                data.search = true;
                data.search_value = search_inp;
                data.pagination_url = `/?search=${search_inp}`;
            }
            else if(!isUndefined(author_inp)){
                data.pagination_url = `/?author=${author_inp}`;
                query = {author : author_inp};
            }

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

            res.render('category/category', data);

        })

    }
    catch (error) {

        next(error);

    }

});

router.post('/', async(req, res, next)=>{

    try{

        let {title_inp, parent_inp} = req.body;
        let page_number = 1;
        let page_limit = req.session.limit;

        if(req.query.page){

            page_number = parseInt(req.query.page);

            if(page_number <= 0){

                page_number = 1;

            }

        }
        if(!req.session.limit){

            page_limit = 10;

        }

        let validation_result = new validation([
            {value : title_inp},
            {value : parent_inp}
        ]).valid();

        if(validation_result){

            return res.json(validation_result);

        }

        let result = await category_model.add(req.session.admin_id, title_inp, parent_inp);

        if(result && result != -1){

            let category_list = await category_model.getAll(page_number, page_limit);
            let last_page = category_list.total_pages;

            return res.json({
                status : 'success',
                url : `${config.backend_url}category/?page=${last_page}`,
                msg : 'دسته جدید با موفقیت ثبت شد.'
            })

        }
        else{

            return res.json('این نام تکراری می باشد. لطفا از نام دیگری استفاده کنید.')

        }

    }
    catch (error) {

        next(error);

    }

});

const get_sub_category = require('./api/get-sub-category');
const delete_category = require('./api/delete-category');
const delete_select = require('./api/delete-select');
const get_category = require('./api/get-category');

const edit = require('./edit');

router.use('/api/get-sub-category', get_sub_category);
router.use('/api/delete-category', delete_category);
router.use('/api/delete-select', delete_select);
router.use('/api/get-category', get_category);

router.use('/edit', edit);

module.exports = router;