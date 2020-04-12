function validateForm() {
    var email = document.forms["myForm"]["email"].value;
    var password = document.forms["myForm"]["password"].value;
    var text;
    document.getElementById("text").style.display="block";



    if (email==""){
        text = "ایمیل را وارد کنید!";
    }
    else if (!email.includes("@")){
        text = "ایمیل را وارد شده صحیح نیست!";
    }
    else if (password==""){
        text = "رمز عبور را وارد کنید!";
    }
    document.getElementById("text").innerHTML = text;
    return false;
}