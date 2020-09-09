const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let data = {

            content_list : await fileManager.getPathContent(backend_upload_dir, backend_upload_dir),
            disk_info : await fileManager.getDiskInfo(backend_upload_dir),

        }

        res.render('files/files', data);

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;