//collapse menu 

    for (let i = 0; i < dashboard_collaps.length; i++) {

        dashboard_collaps[i].addEventListener('click', function () {
    
            if(window.innerWidth > 992){

                this.classList.toggle('active_collapse');

            }

            let panel = this.nextElementSibling;
            let panelChildNode = this.childNodes;
    
            if (panel.style.maxHeight) {
    
                panel.style.maxHeight = null;
                panelChildNode[2].style.transform = 'rotate(0deg)';
                panelChildNode[0].style.color = '#B5B5C3';
                panelChildNode[1].style.color = '#808080';
                panelChildNode[2].style.color = "#B5B5C3";
    
            } else {
    
                panel.style.maxHeight = panel.scrollHeight + 'px';
                panelChildNode[2].style.transform = 'rotate(-90deg)';

                if(window.innerWidth > 992){

                    panelChildNode[2].style.color = "#FFBC00";
                    panelChildNode[0].style.color = "#FFBC00";
                    panelChildNode[1].style.color = "#FFBC00";

                }
    
            }
    
        });
    
    }



