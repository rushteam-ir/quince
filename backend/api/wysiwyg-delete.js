const router = express.Router();

router.post('/', function (req, res) {

    try{

        log('im in delete rout')
        let this_src = req.body.src
        let path_to_delete = this_src.split('/')
        log(path_to_delete[path_to_delete.length - 1])
        //fs.unlinkSync(path_to_delete);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;