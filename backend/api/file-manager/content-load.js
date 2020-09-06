const router = express.Router();

router.post('/', async (req, res, next)=>{

    try{

        let file_path = backend_upload_dir + req.body.path + '/';
        let content_list = await fileManager.getPathContent(file_path, backend_upload_dir);

        res.json(content_list)

    }
    catch (error) {

        next(error);

    }

})

module.exports = router;