const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.redirect(`${config.backend_url}users/list`)

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

const list = require('./list');

router.use('/list', list);

module.exports = router;