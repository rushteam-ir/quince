//collapse menu 

for (let i = 0; i < dashboard_collaps.length; i++) {

    dashboard_collaps[i].addEventListener('click', function () {


        let panel = this.nextElementSibling;
        let panelChildNode = this.childNodes;

        if (panel.style.maxHeight) {

            panel.style.maxHeight = null;
            
        } else {

            panel.style.maxHeight = panel.scrollHeight + 'px';
            
        }
        
        this.classList.toggle('collaps_on');

    });

}