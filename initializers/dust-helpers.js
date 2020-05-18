module.exports = dust_options = {

    cache : false,
    helpers : ['dustjs-helpers',

        function (dust) {
            dust.helpers.alertError = function (chunk, context, bodies, params) {

                if(msg_param === context.resolve(params.key)){

                    let html = `<div class="error_danger_alert text-right alert_query" id="error_field_danger"> <i class="fal fa-times d-inline-block remove_error_icon" onclick="removeDangerError()"></i> <i class="fal fa-exclamation-circle alert_icon_error"></i> <div class="d-inline-block mr-1">${context.resolve(params.msg)}</div> </div>`;

                    body = bodies.block;
                    //chunk.write(html);
                    chunk.render(body, context);
                    return chunk;

                }

            },

            dust.helpers.alertSuccess = function (chunk, context, bodies, params) {

                if(msg_param === context.resolve(params.key)){

                    let html = `<div class="error_success_alert text-right alert_query" id="error_field_success"> <i class="fal fa-times d-inline-block remove_error_icon" onclick="removeSuccessError()"></i> <i class="fal fa-exclamation-circle alert_icon_error"></i> <div class="d-inline-block mr-1">${context.resolve(params.msg)}</div> </div>`;

                    body = bodies.block;
                    //chunk.write(html);
                    chunk.render(body, context);
                    return chunk;

                }

            },

            dust.helpers.alertWarn = function (chunk, context, bodies, params) {

                if(msg_param === context.resolve(params.key)){

                    let html = `<div class="error_warning_alert text-right alert_query" id="error_field_warning"> <i class="fal fa-times d-inline-block remove_error_icon" onclick="removeWarningError()"></i> <i class="fal fa-exclamation-circle alert_icon_error"></i> <div class="d-inline-block mr-1">${context.resolve(params.msg)}</div> </div>`;

                    body = bodies.block;
                    //chunk.write(html);
                    chunk.render(body, context);
                    return chunk;

                }

            },

            dust.helpers.pageRender = function (chunk, context, bodies, params) {

                let pages_number = parseInt(context.resolve(params.number));
                let url_pagination = context.resolve(params.url);
                let current_page = parseInt(context.resolve(params.current));

                let html = `<ul class="pagination category_pagination">`;

                if(current_page == 1){

                    html += `<li class="page-item"><a class="page-link" href="${url_pagination}/?page=1" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`

                }
                else{

                    html += `<li class="page-item"><a class="page-link" href="${url_pagination}/?page=${current_page - 1}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`

                }

                for(let i = 1; i <= pages_number; i++){

                    if(i == current_page){

                        html += `<li class="page-item"><a class="page-link" href="${url_pagination}/?page=${i}">${i}</a></li>`

                    }
                    else{

                        html += `<li class="page-item"><a class="page-link" href="${url_pagination}/?page=${i}">${i}</a></li>`

                    }

                }

                if(current_page == pages_number){

                    html += `<li class="page-item"><a class="page-link" href="${url_pagination}/?page=${pages_number}" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`

                }
                else{

                    html += `<li class="page-item"><a class="page-link" href="${url_pagination}/?page=${current_page + 1}" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`

                }

                html += `</ul>`

                chunk.write(html);
                return chunk;

            }

        }

    ]

};