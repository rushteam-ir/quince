// Backend Initializer and settings
backend = express();
backend.disable('x-powered-by');
backend.use(express.static(`${config.app_dir}backend/templates/${config.backend_tmp}/assets`));

// Backend Dust configuration
backend.engine('dust', adaro.dust(dust_options));
backend.set('view engine', 'dust');
backend.set('views', `${config.app_dir}backend/templates/${config.backend_tmp}/views`);

// Backend body parser configuration
backend.use(body_parser.urlencoded({extended : false}));
backend.use(body_parser.json());

// Backend file uplaod
backend.use(file_upload());

// Backend other configs
backend_allowd_urls = ['/login/', '/recovery/', '/recovery/verify/'];
backend_allowd_avatars = ['png', 'jpeg', 'jpg', 'gif'];
backend_limited_avatars_size = 1024; // KB
backend_upload_dir = `${config.app_dir}backend/templates/${config.backend_tmp}/assets/media/`;

// Backend Local variables using in Dust template engine
backend.locals.backend_url = config.backend_url;
backend.locals.debug_mode = config.debug_mode;
backend.locals.captcha_url = config.captcha_url;
backend.locals.zend_cms_version = "1.0.0";
backend.locals.limited_avatars_size = (backend_limited_avatars_size/1024).toString();