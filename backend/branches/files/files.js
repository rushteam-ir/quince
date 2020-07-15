const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let data = {

            routes : ['شاخه اصلی'],
            current_route : 0,
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

            routes : ['شاخه اصلی', `${directory}`],
            current_route : 1,
            directories_list : await fileManager.loadDirectories(`${backend_upload_dir}${directory}`),
            files_list : await fileManager.loadFiles(`${backend_upload_dir}${directory}`)

        }

        res.render('files/files', data);

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;