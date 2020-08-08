const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        await serverHelpers.tableList(req, async (page_number, page_limit, can_edit)=>{

            let admins_list = await user_model.getAll(page_number, page_limit);

            if(admins_list.list.length == 0 && admins_list.total_pages != 0){

                return res.redirect(`${config.backend_url}groups/admins/?page=${admins_list.total_pages}`)

            }

            let data = {

                access_list : await access_model.getList(),
                admins_list : admins_list.list,
                page_number : page_number,
                page_limit : page_limit,
                rows_begin_number : admins_list.rows_begin_number,
                total_pages : admins_list.total_pages,
                can_edit : can_edit,
                search : false,

            };

            res.render('groups/groups-admins', data);

        })

    }
    catch (error) {

        next(error);

    }

});

const change_status = require('./api/change-status');
const delete_admins = require('./api/delete-admins');
const delete_select = require('./api/delete-select');

const search = require('./search');
const access = require('./access');

router.use('/api/change-status', change_status);
router.use('/api/delete-admins', delete_admins);
router.use('/api/delete-select', delete_select);

router.use('/search', search);
router.use('/access', access);

module.exports = router;