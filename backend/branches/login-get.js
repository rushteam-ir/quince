module.exports = async function (req, res) {

    try{

        if(req.session.login_form){

            let login_form = req.session.login_form;
            res.render('login',{login_form})

        }
        else{

            res.render('login');

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

};