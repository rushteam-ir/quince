//

let current = document.getElementById('current');
let thumbnails = document.querySelectorAll('.thumb');


thumbnails.forEach( (e)=> {
    e.addEventListener('click',  ()=> {
        let getsrc = e.getAttribute('src');
        current.setAttribute('src',getsrc);
    });
});


//Similar Product Slider

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})




