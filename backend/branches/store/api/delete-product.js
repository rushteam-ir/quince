const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let product_id = req.query.id;

        if(isObjectId(product_id)){

            let result = await product_model.del(product_id);

            if(result){

                let main_image = `${backend_upload_dir}products/${result._id}_main.png`;
                try{
                    fs.unlinkSync(main_image);
                }
                catch (e) {
                    // can't find file
                }

                for(let i = 1; i < result.images.length; i++){
                    let other_image = `${backend_upload_dir}products/${result._id}_${i}.png`;
                    try{
                        fs.unlinkSync(other_image);
                    }
                    catch (e) {
                        // can't find file
                    }
                }

                return res.redirect(`${config.backend_url}store/list/?msg=delete-success`);

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

        res.status(500).render('500', {error});

    }

});

module.exports = router;