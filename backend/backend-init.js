backend = express();

backend.disable('x-powered-by');
backend_root_dir = `${config.app_dir}backend/templates/${config.backend_tmp}`;
backend.use(express.static(`${backend_root_dir}/assets`));
backend.set('views', `${backend_root_dir}/views`);

backend_upload_dir = `${backend_root_dir}/assets/media/`;
backend_allowd_urls = ['/login/', '/recovery/', '/recovery/verify/'];
backend_access = {
    content : {
        '/category/': 'دسته بندی',
        '/article/': 'مقاله ها',
        '/article/add/': 'مقاله ها',
        '/article/list/': 'مقاله ها',
    },
    support : {
        '/comments/': 'نظرات',
        '/contacts/': 'تماس با ما',
    },
    management : {
        '/groups/admins/': 'لیست مدیران',
        '/groups/users/': 'لیست کاربران',
        '/groups/access/': 'دسترسی ها',
        '/groups/add/': 'افزودن مدیر جدید',
        '/files/': 'مدیریت فایل ها',
    },
    edit : {
        'category/': 'ویرایش دسته ها',
        'article/list/': 'ویرایش مقاله ها',
        'groups/admins/': 'تنظیمات مدیران',
        'groups/users/': 'تنظیمات کاربران',
        'groups/access/': 'ویرایش دسترسی ها',
        'comments/': 'ویرایش نظرات',
        'contacts/': 'ویرایش تماس با ما',
    }
}

backend.locals.backend_url = config.backend_url;
backend.locals.frontend_url = config.frontend_url;
backend.locals.debug_mode = config.debug_mode;
backend.locals.captcha_url = config.captcha_url;
backend.locals.messages_status = false;
backend.locals.page_limit_slot = [5,10,20,50];
backend.locals.limit_page = 5;
backend.locals.limited_images_size = (config.image_limited_size/1024).toString();
backend.locals.backend_access = backend_access;