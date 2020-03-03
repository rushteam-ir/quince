// Importing all requirements
require('./initializers/app-config');
require('./initializers/app-init');
require('./initializers/lib');

// Importing backend branches
let branch_files = fs.readdirSync(__dirname + '/backend/branches/');
branch_files.forEach((extracted_file)=>{

    let new_branch = require(__dirname + '/backend/branches/' + extracted_file);
    let branch_name = extracted_file.slice(0,-3);
    backend_branches[branch_name] = new_branch;

});

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

app.use('/admin', backend);

// App captcha generator
app.get('/captcha', async(req, res)=>{


        let captcha = svg_captcha.create({

            size : 5,
            ignoreChars: '0o1il',
            noise : 3,
            fontSize : 30

        });

        svg_captcha.loadFont('./captcha/svg-captcha.ttf')

        req.session.captcha = captcha.text;

        res.type('svg');
        res.send(captcha.data);

});




