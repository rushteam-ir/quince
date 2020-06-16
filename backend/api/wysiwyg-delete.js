const router = express.Router();

router.post('/', async function (req, res) {

    try{

        let {link_inp, type_inp} = req.body
        let link_split = link_inp.split('/')
        let file_name = link_split[link_split.length - 1]
        let file_path = `${backend_upload_dir}${type_inp}/${file_name}`

        try{

            fs.unlinkSync(file_path);

            const index = req.session.article_internal_files.indexOf(`${type_inp}/${file_name}`);

            if (index > -1) {
                req.session.article_internal_files.splice(index, 1);
            }

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