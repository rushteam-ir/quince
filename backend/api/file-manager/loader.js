const router = express.Router();

router.post('/', async (req, res, next)=>{

    try{

        let file_path = backend_upload_dir;

        await fileManager.getFiles(file_path)

    }
    catch (error) {

        next(error);

    }

})

module.exports = router;