const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let reports_list = await report_model.getAll();
        res.render('api/get-reports', {reports_list});

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;