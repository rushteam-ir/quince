const router = express.Router();

router.get('/', async(req,res)=>{

    let delete_id = req.query.id;

    if(isObjectId(delete_id)){

        let admin_find = await admin_model.getById(delete_id);
        //let user_find = await user_model.getById(delete_id);

        if(admin_find){

            let result = await admin_model.del(delete_id);

            if(result){

                return res.redirect(`${config.backend_url}users/list/?msg=delete-success`);

            }
            else{

                return res.redirect(`${config.backend_url}users/list/?msg=delete-fail`);

            }

        }
        else{

        }

    }

});

module.exports = router;