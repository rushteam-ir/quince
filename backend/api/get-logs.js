const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let logs_list = await log_model.getLogs();

        res.json(logs_list);

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;