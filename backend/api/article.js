const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        // NEW API MODEL HERE

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;