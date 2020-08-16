//collapse menu 
for (let i = 0; i < dashboard_collaps.length; i++) {

    dashboard_collaps[i].addEventListener('click', function () {

        let panel = this.nextElementSibling;

        let maxheightvar = $(this).next().css('max-height');

        if (dashboard.width() > 100) {

            if (maxheightvar !== '0px') {

                panel.style.maxHeight = '0px';
                $('.collaps_field').css('max-Height')
                this.classList.remove('collaps_on');
                this.classList.remove('rotate_parent');

            } else{

                panel.style.maxHeight = panel.scrollHeight + 'px';
                this.classList.add('collaps_on');
                this.classList.add('rotate_parent');

            }

        }

    });

}