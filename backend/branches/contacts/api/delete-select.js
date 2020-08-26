const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let id_list = req.query.id;
        let back_url = req.header('Referer') || '/';

        for(let i = 0; i < id_list.length; i++){

            let contact_id = id_list[i];

            if(isObjectId(contact_id)){

                let result = await contact_model.del(contact_id);

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