const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let id_list = req.query.id;
        let back_url = req.header('Referer') || '/';

        for(let i = 0; i < id_list.length; i++){

            let user_id = id_list[i];

            if(isObjectId(user_id)){

                let result = await admin_model.del(user_id);

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