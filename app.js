require('./initializers/requirements');

const app = express();

app.disable('x-powered-by');

app.use(session(session_options));
app.use(compression());
app.use(body_parser.urlencoded({extended : false}));
app.use(body_parser.json());
app.use(file_upload());

app.engine('dust', adaro.dust(dust_helpers));
app.set('view engine', 'dust');

const backend = require('./backend/backend');
const frontend = require('./frontend/frontend');

app.use('/quince', backend);
app.use('/', frontend);

app.listen(config.port, async(error)=>{

    if(error){

        log(error);

    }
    else {

        log(`Server created successfully on port ${config.port}.`);

    }

});

