const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.render('groups/groups-add');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;