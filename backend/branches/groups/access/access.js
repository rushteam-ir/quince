const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        await serverHelpers.tableList(req, async (page_number, page_limit, data)=>{

            let search_inp = req.query.search;
            let query = null;

            if(!isUndefined(search_inp)){
                data.search = true;
                data.search_value = search_inp;
                data.pagination_url = `/?search=${search_inp}`;
            }

            let access_list = await access_model.search(query, search_inp ? search_inp : null, page_number, page_limit);

            if(access_list.list.length == 0 && access_list.total_pages != 0){

                return res.redirect(`${config.backend_url}groups/access/?page=${access_list.total_pages}`)

            }

            data.access_list = access_list.list;
            data.page_number = page_number;
            data.page_limit = page_limit;
            data.rows_begin_number = access_list.rows_begin_number;
            data.total_pages = access_list.total_pages;

            res.render('groups/groups-access', data);

        })

    }
    catch (error) {

        next(error);

    }

});

router.post('/', async(req, res, next)=>{

    try{

        let {title_inp} = req.body;
        let access_list_inp = req.body['access_select_inp[]'];

        let validation_result = new validation([
            {value : title_inp},
        ]).valid()

        if(validation_result){

            return res.json(validation_result)

        }

        let access_data = {

            title : title_inp,
            values : (access_list_inp == null) ? [] : access_list_inp,
            author : req.session.admin_id

        }

        let result = await access_model.add(access_data);

        if(result){

            return res.json({
                status : 'success',
                url : `${config.backend_url}groups/access`,
                msg : `دسترسی جدید با موفقیت ثبت شد.`
            })

        }
        else{

            return res.json('این نام تکراری می باشد، لطفا از نام دیگری استفاده کنید.')

        }

    }
    catch (error) {

        next(error);

    }

})

const delete_access = require('./api/delete-access');
const delete_select = require('./api/delete-select');
const get_access = require('./api/get-access');
const get_admin_access = require('./api/get-admin-access');

const edit = require('./edit');

router.use('/api/delete-access', delete_access);
router.use('/api/delete-select', delete_select);
router.use('/api/get-access', get_access);
router.use('/api/get-admin-access', get_admin_access);

router.use('/edit', edit);

module.exports = router;