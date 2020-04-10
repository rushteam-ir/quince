const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let data = {

            list : await category_model.get(),
            list_all : await category_model.getAll(),

        };

        res.render('category', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/', async(req,res)=>{

    try{

        let {title_inp, parent_inp} = req.body;
        let valid_title = validation.isSafe(title_inp);
        let valid_parent = validation.isSafe(parent_inp);

        if(valid_title != ''){

            res.redirect(`${config.backend_url}category`);

        }
        else if(valid_parent != ''){

            res.redirect(`${config.backend_url}category`);

        }
        else{

            let result = await category_model.add(title_inp, parent_inp);

            if(result && result != -1){

                res.redirect(`${config.backend_url}category/?msg=add-success`);

            }
            else{

                res.redirect(`${config.backend_url}category/?msg=add-fail`);

            }

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