// Importing all requirements
require('./backend-init');

// Backend routs
// Server get params middleware
backend.use(async(req,res,next)=>{

    await backend_branches['param-check'](req, res, next);

});


backend.use(async(req, res, next)=>{

    await backend_branches['login-check'](req, res, next);

});

backend.get('/', async(req,res)=>{

    await backend_branches['main'](req, res);

});

backend.get('/shop', async(req,res)=>{

    res.redirect(`${config.backend_url}shop/list`);

});

backend.get('/shop/list', async(req,res)=>{

    await backend_branches['shop-get'](req, res);

});

backend.get('/shop/add', async(req,res)=>{

    await backend_branches['shop-add-get'](req, res);

});

backend.get('/category', async(req,res)=>{

    await backend_branches['category-get'](req, res);

});

backend.post('/category', async(req,res)=>{

    await backend_branches['category-post'](req, res);

});

backend.get('/dashboard', async(req,res)=>{

    await backend_branches['dashboard'](req, res);

});

backend.get('/profile', async(req,res)=>{

    await backend_branches['profile-get'](req, res);

});

backend.post('/profile', async(req,res)=>{

    await backend_branches['profile-post'](req, res);

});

backend.get('/login', async(req,res)=>{

    await backend_branches['login-get'](req, res);

});

backend.post('/login', async(req,res)=>{

    await backend_branches['login-post'](req, res);

});


backend.get('/recovery', async(req,res)=>{

    await backend_branches['recovery-get'](req, res);

});

backend.post('/recovery', async(req,res)=>{

    await backend_branches['recovery-post'](req, res);

});

backend.get('/recovery/verify', async(req,res)=>{

    await backend_branches['verify-get'](req, res);

});

backend.post('/recovery/verify', async(req,res)=>{

    await backend_branches['verify-post'](req, res);

});

// Backend 404 page
backend.use(async(req,res,next)=>{

    res.status(404).render('404');

});

// Exporting module
module.exports = backend;