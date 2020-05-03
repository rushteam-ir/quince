var close_dashboard = document.querySelector('.close_dashboard');
var open_dashboard = document.querySelector('.open_dashboard');
var dashboard = document.querySelector('.dashboard');
var dashboard_logo = document.querySelector('.dashboard_logo');

var dashboard_text = document.querySelectorAll('.dashboard_text');

close_dashboard.addEventListener('click', closeDsh);
open_dashboard.addEventListener('click', openDsh);

if(localStorage.close == 'open'){

    openDsh();

}

if(localStorage.close == 'close'){

    closeDsh();
    dashboard.style.transition = 'none';

}

function closeDsh() {

    dashboard.style.width = '3.3333%';
    open_dashboard.style.display = 'block';
    close_dashboard.style.display = 'none';
    dashboard_logo.style.display = 'none';
    localStorage.close = 'close';
    let i = 0;

    while(i < dashboard_text.length){

        dashboard_text[i].style.display = 'none';
        i++;

    }

}

function openDsh() {

    dashboard.style.width = '15%';
    open_dashboard.style.display = 'none';
    close_dashboard.style.display = 'block';
    dashboard_logo.style.display = 'block';
    localStorage.close = 'open';
    let i = 0;

    while(i < dashboard_text.length){

        dashboard_text[i].style.display = 'inline-block';
        i++

    }

}


//collaps
