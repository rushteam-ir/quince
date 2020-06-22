const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let product_id = req.query.id;

        if(isObjectId(product_id)){

            let result = await product_model.del(product_id);

            if(result){

                let main_image = `${backend_upload_dir}products/${result._id}_main.png`;
                fs.unlink(main_image, function(err) {})

                for(let i = 1; i < result.images.length; i++){
                    let other_image = `${backend_upload_dir}products/${result._id}_${i}.png`;
                    fs.unlink(other_image, function(err) {})
                }

                return res.redirect(`${config.backend_url}store/list`);

            }
            else{

                return res.redirect(`${config.backend_url}store/list`);

            }

        }
        else{

            return res.redirect(`${config.backend_url}store/list`);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;