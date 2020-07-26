class serverHelpers {

    async tableList(req, callback){

        let parsed_url = req._parsedOriginalUrl.pathname;
        let page_number = 1;
        let page_limit = req.session.limit;
        let can_edit = false;

        if(!parsed_url.endsWith('/')){

            parsed_url += '/';

        }

        parsed_url = parsed_url.split('/').slice(2).join('/')

        let find_access_edit = backend_access.edit[parsed_url];

        if(isUndefined(req.session.admin_info.access_type)){

            can_edit = true;

        }
        else{

            can_edit = (req.session.admin_info.access_type.values.includes(find_access_edit)) ? true : false;

        }

        if(req.query.page){

            page_number = parseInt(req.query.page);

            if(page_number <= 0){

                page_number = 1;

            }

        }
        if(!req.session.limit){

            page_limit = 10;

        }

        await callback(page_number, page_limit, can_edit);

    }

}

module.exports = new serverHelpers();