const router = express.Router();

router.get('/', async(req, res)=>{


    let captcha = svg_captcha.create({

        size : 5,
        ignoreChars: '0o1il',
        noise : 3,
        fontSize : 30

    });

    svg_captcha.loadFont(`${config.app_dir}backend/templates/${config.backend_tmp}/assets/font/Vazir.ttf`);

    req.session.captcha = captcha.text;

    res.type('svg');
    res.send(captcha.data);

});

module.exports = router;