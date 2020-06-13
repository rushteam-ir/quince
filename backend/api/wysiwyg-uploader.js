const router = express.Router();

router.post('/', function (req, res) {

    log('aaaaaaaa')
    FroalaEditor.Image.upload(req, '/uploads/', function(err, data) {

        if (err) {
            return res.send(JSON.stringify(err));
        }

        res.send(data);

    });
});

module.exports = router;