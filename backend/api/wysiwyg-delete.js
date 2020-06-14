const router = express.Router();

router.post('/', function (req, res) {

    try{

        let {link_inp, type_inp} = req.body
        let link_split = link_inp.split('/')
        let file_name = link_split[link_split.length - 1]
        let file_path = `${backend_upload_dir}${type_inp}/${file_name}`


        try{
            fs.unlinkSync(file_path);
        }
        catch (e) {
            //error
        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;