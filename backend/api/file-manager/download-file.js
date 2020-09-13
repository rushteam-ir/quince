const router = express.Router();

router.get('/', async (req, res, next)=>{

    try{

        let file_path = backend_upload_dir + req.query.path;

        res.download(file_path, path.basename(file_path));

    }
    catch (error) {

        next(error);

    }

})

module.exports = router;