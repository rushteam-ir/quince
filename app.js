// Importing all requirements
require('./initializers/app-config');
require('./initializers/app-init');
require('./initializers/lib');

// Creating Server
const app = express();

app.listen(config.port, async(error)=>{

    if(error){

        log(error);

    }
    else {

        log(`Server created successfuly on port ${config.port}.`);

    }

});

// Server settings
app.disable('x-powered-by');

// Server session configuration
app.use(session(session_options));

// Server routs
const backend = require('./backend/backend');
const frontend = require('./frontend/frontend');

app.use('/admin', backend);
app.use('/', frontend);

// App captcha generator
app.get('/captcha', async(req, res)=>{


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
