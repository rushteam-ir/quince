const router = express.Router();

router.post('/', async(req,res)=>{

    try{

        log(req)
        let {category_id, title_inp, parent_inp} = req.body;

        let result = await category_model.edit(category_id, title_inp, parent_inp);

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