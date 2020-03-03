module.exports = async function (req, res) {

    try{

        res.render('dashboard');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

};