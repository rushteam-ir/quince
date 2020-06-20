const router = express.Router();

router.post('/', async(req,res)=>{

    try{

        let do_inp = req.body.do_inp;

        switch (do_inp) {

            case 'delete':
            {

                let rows_list = req.body.rows_inp;

                for(let i = 0; i < rows_list.length; i++){

                    let article_id = rows_list[i];

                    if(isObjectId(article_id)){

                        let result = await category_model.del(article_id);

                        if(!result){

                            break;

                        }

                    }
                    else{

                        break;

                    }

                }

                res.end();
                break;

            }

        }


    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;