const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let data = {

            list : await user_model.get()

        }

        res.render('users/users-list', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;