let dashboard_angle = document.getElementsByClassName('dashboard_angle');
let dashboard_text = document.querySelectorAll('.dashboard_text');
let close_dashboard = document.querySelector('.close_dashboard');
let open_dashboard = document.querySelector('.open_dashboard');
let dashboard_logo = document.querySelector('.dashboard_logo');
let dashboard_main = document.querySelector('.dashboard_main');
let dashboard = document.querySelector('.dashboard');


close_dashboard.addEventListener('click', closeDsh);
open_dashboard.addEventListener('click', openDsh);

if (localStorage.close == 'open') {

    openDsh();

}

if (localStorage.close == 'close') {

    closeDsh();
    dashboard.style.transition = 'none';
    dashboard_main.style.transition = 'none';

}

function closeDsh() {

    dashboard_main.style.transition = 'all ease-out 0.5s';
    dashboard.style.transition = 'all ease-out 0.5s';
    open_dashboard.style.display = 'block';
    close_dashboard.style.display = 'none';
    dashboard_logo.style.display = 'none';
    dashboard_main.style.width = '96%';
    dashboard.style.width = '4%';
    localStorage.close = 'close';
    let i = 0;
    let y = 0;

    while (i < dashboard_text.length) {

        dashboard_text[i].style.display = 'none';
        i++;

    }

    while (y < dashboard_angle.length) {

        dashboard_angle[y].style.display = 'none';
        y++;

    }

}

function openDsh() {

    dashboard_main.style.transition = 'all ease-out 0.5s';
    dashboard.style.transition = 'all ease-out 0.5s';
    open_dashboard.style.display = 'none';
    close_dashboard.style.display = 'block';
    dashboard_logo.style.display = 'block';
    dashboard_main.style.width = '85%';
    dashboard.style.width = '15%';
    localStorage.close = 'open';

    let y = 0;

    setTimeout(function(){

        let i = 0;

        while (i < dashboard_text.length) {

            dashboard_text[i].style.display = 'inline-block';
            i++

        }

    },140);


    while (y < dashboard_angle.length) {

        dashboard_angle[y].style.display = 'inline-block';
        y++;

    }

}