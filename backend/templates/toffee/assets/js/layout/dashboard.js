let close_dashboard = document.querySelector('.close_dashboard');
let open_dashboard = document.querySelector('.open_dashboard');
let dashboard = document.querySelector('.dashboard');
let dashboard_logo = document.querySelector('.dashboard_logo');

close_dashboard.addEventListener('click', closeDsh);
open_dashboard.addEventListener('click' , openDsh);

function closeDsh(){

    dashboard.style.width = '3.2%';
    open_dashboard.style.display = 'block';
    close_dashboard.style.display = 'none';
    dashboard_logo.style.display = 'none';
    sessionStorage.close = 'close';
    dashboard.style.transition = 'all ease-out 0.5s'

}

function openDsh(){

    dashboard.style.width = '15%';
    open_dashboard.style.display = 'none';
    close_dashboard.style.display = 'block';
    dashboard_logo.style.display = 'block';
    sessionStorage.close = 'open';
    dashboard.style.transition = 'all ease-out 0.5s'

} 

if(sessionStorage.close == 'open'){

    openDsh()

}

if(sessionStorage.close == 'close'){

    closeDsh();
    dashboard.style.transition = 'none'

}