const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.redirect(`${config.backend_url}store/list`);

    }
    catch (error) {

        next(error);

    }

});

const add = require('./add');
const list = require('./list');

router.use('/add', add);
router.use('/list', list);

module.exports = router;