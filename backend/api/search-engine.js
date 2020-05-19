const router = express.Router();

router.post('/', async(req,res)=>{

    try{

        let {search_value, search_url, database} = req.body;
        let result_list = [];

        switch(database){

            case 'category':
            {

                result_list = await category_model.search(search_value);

                break;

            }

        }

        res.redirect(search_url)


    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;