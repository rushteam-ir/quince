const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.render('recovery/recovery');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

const verify = require('./verify');

router.use('/verify', verify);

module.exports = router;