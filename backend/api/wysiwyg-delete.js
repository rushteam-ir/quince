const router = express.Router();

router.post('/', async function (req, res) {

    try{

        let {link_inp, type_inp} = req.body;
        let link_split = link_inp.split('/');
        let file_name = link_split[link_split.length - 1];
        let file_path = `${backend_upload_dir}${type_inp}/${file_name}`;

        fs.unlink(file_path, function(err) {})

        let index = req.session.temp_files.indexOf(`${type_inp}/${file_name}`);

        if (index > -1) {
            req.session.temp_files.splice(index, 1);
        }

        res.end();

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;