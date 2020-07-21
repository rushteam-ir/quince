function click_on_menu_bar()
{
    new WOW().init();
    setInterval(function ()
    {
        document.getElementById('first_text_about_uniti').style.display='none';
        let menu_options= document.getElementsByClassName('menu_options');
        for (let i=0 ; i<menu_options.length ; i++)
        {
            menu_options[i].style.display='block';
        }
    }
    ,1000)
}