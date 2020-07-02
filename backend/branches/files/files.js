const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let directories = [];

        await fs.readdir(`${backend_upload_dir}`,  (err, files)=>{

            for(let file of files){

                fs.stat(`${backend_upload_dir}/${file}`, async (err, stats)=>{

                    if(stats.isDirectory()){

                        log(file)

                    }

                })

            }

        })

        res.render('files/files');

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;