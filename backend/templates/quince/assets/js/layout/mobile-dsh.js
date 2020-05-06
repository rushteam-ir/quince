if (window.innerWidth < 992) {

    mobile_bar.addEventListener('click', mobileOpen);
    close_mobile_dsh.addEventListener('click', mobileClose);

    function mobileOpen() {

        mobile_fade_layout.style.display = 'block';
        dashboard.style.display = 'block';

        setTimeout(function () {

            dashboard.style.width = '23%';

            if (window.innerWidth < 850) {

                dashboard.style.width = '30%';

            }

            if (window.innerWidth < 650) {

                dashboard.style.width = '40%';

            }

            if (window.innerWidth < 500) {

                dashboard.style.width = '55%';

            }

        }, 100)

        setTimeout(function () {

            for (let i = 0; i < dashboard_text.length; i++) {

                dashboard_text[i].style.display = 'block';

            }

        }, 220);

    }

    function mobileClose() {

        mobile_fade_layout.style.display = 'none';
        dashboard.style.width = '0%';

        setTimeout(function () {

            for (let y = 0; y < dashboard_text.length; y++) {

                dashboard_text[y].style.display = 'none';

            }

        }, 200);

        setTimeout(function () {

            dashboard.style.display = 'none';


        }, 510);

    }

}