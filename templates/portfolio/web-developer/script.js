function darkM() {
    const navbar = document.getElementById('navbar');
    navbar.style.backgroundColor = 'black';
    const body = document.getElementById('body');
    body.style.backgroundColor = 'black';
    const projectSection = document.getElementById('projectSection');
    projectSection.style.background = 'black';
    const logo = document.getElementById('logo');
    logo.onload = logo.src = "img/header.png";
    const dark = document.getElementById('darkMode');
    dark.style.display = 'none';
    const light = document.getElementById('lightMode');
    light.style.display = 'block';
    var all = document.getElementsByTagName("*");
    for (var i = 0, max = all.length; i < max; i++) {
        all[i].style.color = "white";
    }
    window.localStorage.setItem('isDarkMode', true)
}
function lightM() {
    const navbar = document.getElementById('navbar');
    navbar.style.backgroundColor = '';
    const body = document.getElementById('body');
    body.style.backgroundColor = '';
    const projectSection = document.getElementById('projectSection');
    projectSection.style.background = '';
    const logo = document.getElementById('logo');
    logo.onload = logo.src = "img/header.png";
    const light = document.getElementById('lightMode');
    light.style.display = 'none';
    const dark = document.getElementById('darkMode');
    dark.style.display = 'block';
    var all = document.getElementsByTagName("*");
    for (var i = 0, max = all.length; i < max; i++) {
        all[i].style.color = "";
    }
    window.localStorage.setItem('isDarkMode', false)
}
const isDarkMode = window.localStorage.getItem('isDarkMode') || false;
if (isDarkMode === 'true') {
    darkM()
}
else {
    lightM()
}
const darkMode = document.getElementById('darkMode');
darkMode.addEventListener('click', darkM);
const lightMode = document.getElementById('lightMode');
lightMode.addEventListener('click', lightM);
function myFunction() {
    var breakPoint = document.getElementById("breakPoint");
    var moreCards = document.getElementById("more");
    var btnCards = document.getElementById("showBtn");
    if (breakPoint.style.display === "none") {
        breakPoint.style.display = "inline";
        btnCards.innerHTML = "Show more";
        moreCards.style.display = "none";
    } else {
        breakPoint.style.display = "none";
        btnCards.innerHTML = "Show less";
        moreCards.style.display = "grid";
    }
}