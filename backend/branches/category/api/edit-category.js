const router = express.Router();

router.post('/', async(req,res)=>{

    try{

        let {category_id, title_inp, parent_inp} = req.body;

        let result = categoty_model.edit(category_id, category_title, category_parent);

        if(result){

            return res.redirect(`${config.backend_url}category/?msg=edit-success`);

        }
        else{

            return res.redirect(`${config.backend_url}category/?msg=edit-fail`);

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;