//collapse menu 

    for (let i = 0; i < dashboard_collaps.length; i++) {

        dashboard_collaps[i].addEventListener('click', function () {
    
            this.classList.toggle('active_collapse');
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
                panelChildNode[2].style.color = "#F64E60";
                panelChildNode[0].style.color = "#F64E60";
                panelChildNode[1].style.color = "#F64E60";
    
            }
    
        });
    
    }
