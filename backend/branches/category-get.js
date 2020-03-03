module.exports = async function (req, res) {

    try{

        let data = {

            list : await category_model.get()

        };

        res.render('category', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

};