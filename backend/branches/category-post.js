module.exports = async function (req, res) {

    try{

        let {title_inp, parent_inp} = req.body;
        let valid_title = validation.isSafe(title_inp);
        let valid_parent = validation.isSafe(parent_inp);

        if(valid_title != ''){

            res.redirect(`${config.backend_url}category/?msg=${valid_title}`);

        }
        else if(valid_parent != ''){

            res.redirect(`${config.backend_url}category/?msg=${valid_parent}`);

        }
        else{

            let result = await category_model.add(title_inp, parent_inp);

            if(result && result != -1){

                res.redirect(`${config.backend_url}category/?msg=add-success`);

            }
            else{

                res.redirect(`${config.backend_url}category/?msg=add-fail`);

            }

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

};