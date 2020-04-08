const router = express.Router();

router.get('/:id', async(req,res)=>{

    try{

        res.render('users/users-profile');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;