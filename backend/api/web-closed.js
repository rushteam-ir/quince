const router = express.Router();

router.post('/', async function (req, res) {

    try{

        let {delete_temp, new_rout} = req.body;

        if(delete_temp){

            for(let i of req.session.article_internal_files){

                try{
                    fs.unlinkSync(`${backend_upload_dir}${i}`);
                }
                catch (e) {
                    //error
                }
            }

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;