//TOP NAVIGATION
function NavBar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("myTopnav").style.width = "100%";
        document.getElementById("myTopnav").style.backgroundColor = "rgba(27, 18, 18, 1)";
        document.getElementById("header").style.position = "fixed";
        document.getElementById("header").style.top = "0%";
        document.getElementById("roll_back").style.display = "flex";
    } else {
        document.getElementById("myTopnav").style.width = "80%";
        document.getElementById("myTopnav").style.backgroundColor = "rgba(1, 1, 1, 0.6)";
        document.getElementById("header").style.position = "fixed";
        document.getElementById("header").style.top = "2rem";
        document.getElementById("roll_back").style.display = "none";
    }
}