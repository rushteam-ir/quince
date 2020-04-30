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

                }

        }

    ]

};