const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let data = {

            parent_list : await category_model.getParent(),
            category_list : await category_model.getAll(),

        };

        res.render('category/category', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/', async(req,res)=>{

    try{

        let {title_inp, parent_inp} = req.body;

        let validation_result = new validation([
            {value : title_inp},
            {value : parent_inp}
        ]).valid();

        if(validation_result){

            return res.redirect(`${config.backend_url}category/?msg=${validation_result}`);

        }

        let result = await category_model.add(title_inp, parent_inp);

        if(result && result != -1){

            return res.redirect(`${config.backend_url}category/?msg=add-success`);

        }
        else{

            return res.redirect(`${config.backend_url}category/?msg=add-fail`);

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

const get_sub_category = require('./api/get-sub-category');
const delete_category = require('./api/delete-category');

router.use('/api/get-sub-category', get_sub_category);
router.use('/api/delete-category', delete_category);

module.exports = router;