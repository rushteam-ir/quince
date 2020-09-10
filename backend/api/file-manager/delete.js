const router = express.Router();

router.get('/', async (req, res, next)=>{

    try{

        log('aaaa')
        let file_path = backend_upload_dir + req.query.path;
        let back_url = req.header('Referer') || '/';

        let result = await fileManager.delete(file_path);

        if(result){

            return res.redirect(back_url);

        }
        else{

            return res.redirect(back_url);

        }

        return res.redirect(back_url);

    }
    catch (error) {

        next(error);

    }

})

module.exports = router;