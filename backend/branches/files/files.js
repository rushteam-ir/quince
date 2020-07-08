const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{


        let data = {

            directories_list : await fileManager.loadDirectories(`${backend_upload_dir}`),
            files_list : await fileManager.loadFiles(`${backend_upload_dir}`)

        }

        res.render('files/files', data);

    }
    catch (error) {

        next(error);

    }

});

router.get('/:id', async(req, res, next)=>{

    try{

        let directory = req.params.id;

        let data = {

            directories_list : await fileManager.loadDirectories(`${backend_upload_dir}${directory}`),
            files_list : await fileManager.loadFiles(`${backend_upload_dir}${directory}`)

        }

        log(data.files_list)

        res.render('files/files', data);

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;