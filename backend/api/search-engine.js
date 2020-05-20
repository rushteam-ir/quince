const router = express.Router();

router.post('/', async(req,res)=>{

    try{

        let {search_value, url, database} = req.body;
        let result_list = [];

        switch(database){

            case 'category':
            {

                result_list = await category_model.search(search_value);

                break;

            }

        }

        log(result_list);

        res.json({
            result_list : result_list
        });


    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;