const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let data = {

            list : await user_model.get()

        }

        res.render('groups/groups-admins', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;