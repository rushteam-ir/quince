const router = express.Router();

router.get('/', async(req,res)=>{

    let delete_id = req.query.id;

    if(isObjectId(delete_id)){

        let result = await category_model.del(delete_id);

        if(result){

            return res.redirect(`${config.backend_url}category/?msg=delete-success`);

        }
        else{

            return res.redirect(`${config.backend_url}category/?msg=delete-fail`);

        }

    }

});

module.exports = router;