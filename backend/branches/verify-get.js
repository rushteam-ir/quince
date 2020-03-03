module.exports = async function (req, res) {

    try{

        if(req.query.code){

            if(req.session.saved_code === req.query.code){

                res.render('recovery-verify');

            }
            else{

                res.status(404).render('404');

            }

        }
        else{

            res.status(404).render('404');

        }


    }
    catch (error) {

        res.status(500).render('500', {error});

    }

};