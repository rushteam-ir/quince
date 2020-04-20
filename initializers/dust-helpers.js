module.exports = dust_options = {

    cache : false,
    helpers : ['dustjs-helpers',

        function (dust) {
            dust.helpers.alertError = function (chunk, context, bodies, params) {

                if(msg_param === context.resolve(params.key)){

                    let html = `<div class="error_danger_alert text-right alert_query" id="error_field_danger"> <i class="fal fa-times d-inline-block remove_error_icon" onclick="removeDangerError()"></i> <i class="fal fa-exclamation-circle alert_icon_error"></i> <div class="d-inline-block mr-1">${context.resolve(params.msg)}</div> </div>`;

                    body = bodies.block;
                    chunk.write(html);
                    chunk.render(body, context);
                    return chunk;

                }

            },

                dust.helpers.alertSuccess = function (chunk, context, bodies, params) {

                    if(msg_param === context.resolve(params.key)){

                        let html = `<div class="error_success_alert text-right alert_query" id="error_field_success"> <i class="fal fa-times d-inline-block remove_error_icon" onclick="removeSuccessError()"></i> <i class="fal fa-exclamation-circle alert_icon_error"></i> <div class="d-inline-block mr-1">${context.resolve(params.msg)}</div> </div>`;

                        body = bodies.block;
                        chunk.write(html);
                        chunk.render(body, context);
                        return chunk;

                    }

                },

                dust.helpers.alertWarn = function (chunk, context, bodies, params) {

                    if(msg_param === context.resolve(params.key)){

                        let html = `<div class="error_warning_alert text-right alert_query" id="error_field_warning"> <i class="fal fa-times d-inline-block remove_error_icon" onclick="removeWarningError()"></i> <i class="fal fa-exclamation-circle alert_icon_error"></i> <div class="d-inline-block mr-1">${context.resolve(params.msg)}</div> </div>`;

                        body = bodies.block;
                        chunk.write(html);
                        chunk.render(body, context);
                        return chunk;

                    }

                },

                dust.helpers.paginationRender = function (chunk, context, bodies, params) {

                    if(msg_param === context.resolve(params.key)){

                        let html = `
                            
                          <nav aria-label="Page navigation example">
                              <ul class="pagination justify-content-center p-0 dir-ltr mt-5">
                                  <li class="page-item">
                                      <a class="page-link" href="${params.url}?page=${backend.locals.limit_page - 1}" aria-label="Previous">
                                          <span aria-hidden="true">&laquo;</span>
                                      </a>
                                  </li>
                                  <li class="page-item">
                                      <a class="page-link" href="${params.url}?page=${backend.locals.limit_page + 1}" aria-label="Next">
        
                                          <span aria-hidden="true">&raquo;</span>
        
                                      </a>
                                  </li>
                              </ul>
                          </nav>
                            
                        `;

                        body = bodies.block;
                        chunk.write(html);
                        chunk.render(body, context);
                        return chunk;

                    }

                }

        }

    ]

};