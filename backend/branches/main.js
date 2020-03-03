module.exports = async function (req, res) {

    try{

        res.redirect(`${config.backend_url}dashboard`);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

};