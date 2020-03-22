// Frontend Initializer and settings
frontend = express();
frontend.disable('x-powered-by');
frontend.use(express.static(`${config.app_dir}frontend/templates/${config.frontend_tmp}/assets`));

// Frontend Dust configuration
frontend.engine('dust', adaro.dust(dust_options));
frontend.set('view engine', 'dust');
frontend.set('views', `${config.app_dir}frontend/templates/${config.frontend_tmp}/views`);

// Frontend body parser configuration
frontend.use(body_parser.urlencoded({extended : false}));
frontend.use(body_parser.json());

// Frontend file uplaod
frontend.use(file_upload());

// Frontend other configs
frontend_allowd_urls = ['/login/', '/recovery/', '/recovery/verify/'];
frontend_allowd_avatars = ['png', 'jpeg', 'jpg', 'gif'];
frontend_limited_avatars_size = 1024; // KB
frontend_limited_products_size = 1024; // KB
frontend_upload_dir = `${config.app_dir}frontend/templates/${config.frontend_tmp}/assets/media/`;

// Frontend Local variables using in Dust template engine
frontend.locals.frontend_url = config.frontend_url;
frontend.locals.debug_mode = config.debug_mode;
frontend.locals.captcha_url = config.captcha_url;
frontend.locals.limited_avatars_size = (frontend_limited_avatars_size/1024).toString();
frontend.locals.limited_products_size = (frontend_limited_products_size/1024).toString();