if(window.innerWidth > 992){

    close_dashboard.addEventListener('click', closeDsh);
    open_dashboard.addEventListener('click', openDsh);
    

    if(window.innerWidth < 1200){

        dashboard.style.width = "15%";
    
    }
    
    // close dashboard
    function closeDsh() {
    
        dashboard_main.style.transition = 'all ease-out 0.5s';
        dashboard.style.transition = 'all ease-out 0.5s';
        close_dashboard.style.display = 'none';
        open_dashboard.style.display = 'block';
        dashboard_logo.style.display = 'none';
        dashboard_main.style.width = '97.1%';
        dashboard.style.width = '45px';
        localStorage.toggle = 'close';
    
        if(window.innerWidth < 1200){
    
            dashboard_main.style.width = '97.1%';
            dashboard.style.width = '45px';
        
        }
    
        let i = 0;
        let y = 0;
        let z = 0;
        let e = 0;
    
        while (i < dashboard_text.length) {
    
            dashboard_text[i].style.display = 'none';
            i++;
    
        }
    
        while (y < dashboard_angle.length) {
    
            dashboard_angle[y].style.display = 'none';
            y++;
    
        }
    
        while (z < sub_collaps.length) {
    
            sub_collaps[z].style.display = 'none';
            z++;
    
        }
    
        while (e < hover_menu.length) {
    
            hover_menu[e].style.display = 'block';
            e++
    
        }
    
        closeCollapse();
    
    }
    
    // open dashboard
    function openDsh() {
    
        dashboard_main.style.transition = 'all ease-out 0.5s';
        dashboard.style.transition = 'all ease-out 0.5s';
        close_dashboard.style.display = 'block';
        dashboard_logo.style.display = 'block';
        open_dashboard.style.display = 'none';
        dashboard_main.style.width = '88%';
        dashboard.style.width = '12%';
        localStorage.toggle = 'open';
    
        if(window.innerWidth < 1200){
    
            dashboard_main.style.width = '85%';
            dashboard.style.width = '15%';
        
        }
    
        let y = 0;
        let z = 0;
        let e = 0;
    
        setTimeout(function () {
    
            let i = 0;
    
            while (i < dashboard_text.length) {
    
                dashboard_text[i].style.display = 'inline-block';
                i++
    
            }
    
        }, 150);
    
    
        while (y < dashboard_angle.length) {
    
            dashboard_angle[y].style.display = 'inline-block';
            y++;
    
        }
    
        while (z < sub_collaps.length) {
    
            sub_collaps[z].style.display = 'block';
            z++
    
        }
    
    
    
        while (e < hover_menu.length) {
        
            hover_menu[e].style.display = 'none';
            e++
        
        }
    
        closeCollapse();
    
    }
    
    // display none hover iteam 
    
    
    
        let e = 0;
    
        while (e < hover_menu.length) {
        
            hover_menu[e].style.display = 'none';
            e++
        
        }
    
    // close collapse when toogle menue
    function closeCollapse(){
    
    
    
        for(let k = 0 ; k < dashboard_collaps.length ; k++){
    
            dashboard_collaps[k].classList.remove('active_collapse');
            dashboard_collaps[k].nextElementSibling.style.maxHeight = null;
            dashboard_collaps[k].childNodes[2].style.transform = "rotate(0deg)"
    
        }
        
    }
    
    // keep menu open or close after refresh
    
    if (localStorage.toggle == 'open') {
    
        openDsh();
        dashboard.style.transition = 'none';
    
    }
    
    if (localStorage.toggle == 'close') {
    
        closeDsh();
        dashboard.style.transition = 'none';
        dashboard_main.style.transition = 'none';
    
    }   

}