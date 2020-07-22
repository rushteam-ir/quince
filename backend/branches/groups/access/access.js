const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

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

        let access_list = await access_model.getAll(page_number, page_limit)

        if(access_list.list.length == 0 && access_list.total_pages != 0){

            return res.redirect(`${config.backend_url}groups/access/?page=${access_list.total_pages}`)

        }

        let data = {

            access_list : access_list.list,
            page_number : page_number,
            page_limit : page_limit,
            rows_begin_number : access_list.rows_begin_number,
            total_pages : access_list.total_pages,
            search : false,

        };

        res.render('groups/groups-access', data);

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
            values : access_list_inp

        }

        let result = await access_model.add(access_data, req.session.admin_id);

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

const edit = require('./edit');
const search = require('./search');

router.use('/api/delete-access', delete_access);
router.use('/api/delete-select', delete_select);

router.use('/edit', edit);
router.use('/search', search);

module.exports = router;