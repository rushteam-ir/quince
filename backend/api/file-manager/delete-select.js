const router = express.Router();

router.get('/', async (req, res, next)=>{

    try{

        let file_path = req.query.path;
        let back_url = req.header('Referer') || '/';

        for(let i = 0; i < file_path.length; i++){

            let path_id = backend_upload_dir + file_path[i];

            await fileManager.delete(path_id);

        }

        return res.redirect(back_url);

    }
    catch (error) {

        next(error);

    }

})

module.exports = router;