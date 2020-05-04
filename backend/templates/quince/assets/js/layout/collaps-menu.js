let dashboard_collaps = document.getElementsByClassName('dashboard_collaps');
let angle_rotate = document.getElementsByClassName('angle_rotate');
let i;

for (i = 0; i < dashboard_collaps.length; i++) {

    dashboard_collaps[i].addEventListener('click', function () {

        this.classList.toggle('active_collapse');
        let panel = this.nextElementSibling;
        let panelChildNode = this.childNodes;

        if (panel.style.maxHeight) {

            panel.style.maxHeight = null;
            panelChildNode[2].style.transform ='rotate(0deg)';

        } else {

            panel.style.maxHeight = panel.scrollHeight + 'px';
            panelChildNode[2].style.transform ='rotate(-90deg)';
            
        }

    });

}