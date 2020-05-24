const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let id_list = req.query.id;

        for(let i = 0; i < id_list.length; i++){

            let category_id = id_list[i];

            if(isObjectId(category_id)){

                let result = await category_model.del(category_id);

                if(!result){

                    break;

                }

            }
            else{

                break;

            }

        }

        return res.redirect(`${config.backend_url}category`);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;