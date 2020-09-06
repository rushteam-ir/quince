const router = express.Router();

router.post('/:id', async (req, res, next)=>{

    try{

        let file_path = backend_upload_dir + req.body.path + '/';

        res.download(file_path);

        // download file to on script github file manager ro ye nega bendaz

    }
    catch (error) {

        next(error);

    }

})

module.exports = router;