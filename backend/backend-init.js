// Backend Initializer and settings
backend = express();

backend.disable('x-powered-by');
backend.use(express.static(`${config.app_dir}backend/templates/${config.backend_tmp}/assets`));
backend.set('views', `${config.app_dir}backend/templates/${config.backend_tmp}/views`);

// Backend other configs
backend_allowd_urls = ['/login/', '/recovery/', '/recovery/verify/'];

backend_access_urls = [
    {name : 'دسته بندی', url : '/category/'},
    {name : 'مقاله ها', url : '/article/'},
    {name : 'مقاله ها', url : '/article/list/'},
    {name : 'مقاله ها', url : '/article/add/'},
    {name : 'لیست مدیران', url : '/groups/admins/'},
    {name : 'لیست کاربران', url : '/groups/users/'},
    {name : 'دسترسی ها', url : '/groups/access/'},
    {name : 'افزودن مدیر جدید', url : '/groups/add/'},
    {name : 'مدیریت فایل ها', url : '/files/'},
]

backend_access_actions = [
    {name : 'ویرایش تمام دسته ها'},
    {name : 'ویرایش تمام مقاله ها'},
    {name : 'ویرایش تنظیمات مدیران'},
    {name : 'ویرایش تنظیمات کاربران'},
]

backend_limited_products_size = 100024; // KB
backend_upload_dir = `${config.app_dir}backend/templates/${config.backend_tmp}/assets/media/`;

// Backend Local variables using in Dust template engine
backend.locals.backend_url = config.backend_url;
backend.locals.debug_mode = config.debug_mode;
backend.locals.captcha_url = config.captcha_url;
backend.locals.messages_status = false;
backend.locals.page_limit_slot = [5,10,20,50];
backend.locals.store_image_slot_default = [1,2,3,4,5,6,7,8,9];
backend.locals.discount_slot_default = [0,1,2,3,4];
backend.locals.store_features_slot_default = [0,1,2,3];
backend.locals.limit_page = 5;
backend.locals.backend_access_urls = backend_access_urls;
backend.locals.backend_access_actions = backend_access_actions;
backend.locals.limited_images_size = (config.image_limited_size/1024).toString();
backend.locals.limited_products_size = (backend_limited_products_size/1024).toString();
backend.locals.msg = '';