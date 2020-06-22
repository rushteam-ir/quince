const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let id_list = req.query.id;
        let back_url = req.header('Referer') || '/';

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

        return res.redirect(back_url);

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;