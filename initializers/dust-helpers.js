module.exports = dust_helpers = {

    cache : false,
    helpers : ['dustjs-helpers',

        function (dust) {

            dust.helpers.keyValue = function (chunk, context, bodies, params) {

                var items = context.current(), //this gets the current context hash from the Context object (which has a bunch of other attributes defined in it)
                    ctx;

                for (key in items) {
                    ctx = {"key" : key, "value" : items[key]};
                    chunk = chunk.render(bodies.block, context.push(ctx));
                }

                return chunk

            },

            dust.helpers.renderHtml = function (chunk, context, bodies, params) {

                let text = context.resolve(params.text);
                let text_decode = entities.decode(text);

                chunk.write(text_decode);
                chunk.render(bodies.block, context);

                return chunk;

            }

            dust.helpers.page = function (chunk, context, bodies, params) {

                let pages_number = parseInt(context.resolve(params.number));
                let url_pagination = context.resolve(params.url);
                let current_page = parseInt(context.resolve(params.current));
                let query = context.resolve(params.query);
                let sub = '?';

                if(query != '/'){
                    sub = '&'
                }

                let html = `<nav class="Page_navigation mt-3" aria-label="Page navigation example"><ul class="pagination">`;
                let prev_etc = false;
                let next_etc = false;

                if(pages_number == 0){

                    chunk.write(html);
                    return chunk;

                }
                if(current_page == 1){

                    html += `<li class="page-item"><a class="page-link" href="${url_pagination}${sub}page=1" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`;

                }
                else{

                    html += `<li class="page-item"><a class="page-link" href="${url_pagination}${sub}page=${current_page - 1}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`;

                }

                for(let i = 1; i <= pages_number; i++){

                    if(i == 1 || i == pages_number){

                        if(i == current_page){

                            html += `<li class="page-item"><a class="page-link current_page" href="${url_pagination}${sub}page=${i}">${i}</a></li>`

                        }
                        else{

                            html += `<li class="page-item"><a class="page-link" href="${url_pagination}${sub}page=${i}">${i}</a></li>`

                        }

                        continue;

                    }
                    if(i == current_page){

                        html += `<li class="page-item"><a class="page-link current_page" href="${url_pagination}${sub}page=${i}">${i}</a></li>`

                    }
                    if(current_page != 1 && current_page != pages_number){

                        if(i == current_page - 1 || i == current_page + 1){

                            html += `<li class="page-item"><a class="page-link" href="${url_pagination}${sub}page=${i}">${i}</a></li>`;

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

                            html += `<li class="page-item"><a class="page-link" href="${url_pagination}${sub}page=${i}">${i}</a></li>`;

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

                    html += `<li class="page-item"><a class="page-link" href="${url_pagination}${sub}page=${pages_number}" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`

                }
                else{

                    html += `<li class="page-item"><a class="page-link" href="${url_pagination}${sub}page=${current_page + 1}" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`

                }

                html += `</ul></nav>`

                chunk.write(html);
                return chunk;

            }

        }

    ]

};