const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let article_id = req.query.id;
        let result = await article_model.edit(article_id, {
            main_image : ""
        });

        if(result){

            let file_path = `${backend_upload_dir}images/${result.main_image}`;
            fs.unlink(file_path, function (err) {});

        }

        res.redirect(`${config.backend_url}article/edit/${article_id}`)

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;