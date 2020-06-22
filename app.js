require('./initializers/requirements');
require('./initializers/config');
require('./initializers/library');

const app = express();

app.disable('x-powered-by');

app.use(session(session_options));

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