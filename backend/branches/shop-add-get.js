module.exports = async function (req, res) {

    try{

        let data = {

            list : await category_model.get(),
            child : await category_model.getAll()

        }

        log(data);
        res.render('shop-add', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

};