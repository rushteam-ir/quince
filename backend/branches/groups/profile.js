const router = express.Router();

router.get('/:id', async(req, res, next)=>{

    try{

        let user_id = req.params.id;
        let find_user = await admin_model.getByUniqueId(user_id);

        // if(find_user){
        //
        //     res.render('groups/groups-profile');
        //
        // }
        // else{
        //
        //     res.status(404).render('errors/404');
        //
        // }

        res.render('groups/groups-profile');

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;