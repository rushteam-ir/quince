module.exports = dust_helpers = {

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

            dust.helpers.page = function (chunk, context, bodies, params) {

                let pages_number = parseInt(context.resolve(params.number));
                let url_pagination = context.resolve(params.url);
                let current_page = parseInt(context.resolve(params.current));

                let h = `<nav class="Page_navigation mt-3" aria-label="Page navigation example">
                                    <ul class="pagination">
                                      <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Previous">
                                          <span aria-hidden="true">&laquo;</span>
                                        </a>
                                      </li>
                                      <li class="page-item"><a class="page-link" href="#">1</a></li>
                                      <li class="page-item"><a class="page-link" href="#">2</a></li>
                                      <li class="page-item"><a class="page-link" href="#">3</a></li>
                                      <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Next">
                                          <span aria-hidden="true">&raquo;</span>
                                        </a>
                                      </li>
                                    </ul>
                                  </nav>`

                let html = `<nav class="Page_navigation mt-3" aria-label="Page navigation example"><ul class="pagination">`;
                let prev_etc = false;
                let next_etc = false;

                if(pages_number == 0){

                    chunk.write(html);
                    return chunk;

                }
                if(current_page == 1){

                    html += `<li class="page-item"><a class="page-link" href="${url_pagination}/?page=1" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`;

                }
                else{

                    html += `<li class="page-item"><a class="page-link" href="${url_pagination}/?page=${current_page - 1}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`;

                }

                for(let i = 1; i <= pages_number; i++){

                    if(i == 1 || i == pages_number){

                        if(i == current_page){

                            html += `<li class="page-item"><a class="page-link current_page" href="${url_pagination}/?page=${i}">${i}</a></li>`

                        }
                        else{

                            html += `<li class="page-item"><a class="page-link" href="${url_pagination}/?page=${i}">${i}</a></li>`

                        }

                        continue;

                    }
                    if(i == current_page){

                        html += `<li class="page-item"><a class="page-link current_page" href="${url_pagination}/?page=${i}">${i}</a></li>`

                    }
                    if(current_page != 1 && current_page != pages_number){

                        if(i == current_page - 1 || i == current_page + 1){

                            html += `<li class="page-item"><a class="page-link" href="${url_pagination}/?page=${i}">${i}</a></li>`;

                        }
                        else{

                            if(i < current_page && !prev_etc){

                                html += '...';
                                prev_etc = true;

                            }
                            if(i > current_page && !next_etc){

                                html += '...';
                                next_etc = true;

                            }

                        }

                    }
                    else{

                        if(i >= current_page - 2 && i <= current_page + 2){

                            html += `<li class="page-item"><a class="page-link" href="${url_pagination}/?page=${i}">${i}</a></li>`;

                        }
                        else{

                            if(i < current_page && !prev_etc){

                                html += '...';
                                prev_etc = true;

                            }
                            if(i > current_page && !next_etc){

                                html += '...';
                                next_etc = true;

                            }

                        }

                    }

                }

                if(current_page == pages_number){

                    html += `<li class="page-item"><a class="page-link" href="${url_pagination}/?page=${pages_number}" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`

                }
                else{

                    html += `<li class="page-item"><a class="page-link" href="${url_pagination}/?page=${current_page + 1}" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`

                }

                html += `</ul></nav>`

                chunk.write(html);
                return chunk;

            }

        }

    ]

};