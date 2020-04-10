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

        log(`Server created successfully on port ${config.port}.`);

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