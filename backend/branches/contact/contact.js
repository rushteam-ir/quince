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

            let contacts_list = await contact_model.search(query, search_inp ? search_inp : null, page_number, page_limit);

            if(contacts_list.list.length == 0 && contacts_list.total_pages != 0){

                return res.redirect(`${config.backend_url}contact/?page=${contacts_list.total_pages}`)

            }

            data.contacts_list = contacts_list.list;
            data.page_number = page_number;
            data.page_limit = page_limit;
            data.rows_begin_number = contacts_list.rows_begin_number;
            data.total_pages = contacts_list.total_pages;

            res.render('contact/contact', data);

        })

    }
    catch (error) {

        next(error);

    }

});

const delete_contact = require('./api/delete-contact');
const delete_select = require('./api/delete-select');

router.use('/api/delete-contact', delete_contact);
router.use('/api/delete-select', delete_select);

module.exports = router;