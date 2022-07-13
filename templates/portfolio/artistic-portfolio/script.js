const   nav = document.querySelector("nav"),
        body =document.querySelector("body"),
        main =document.querySelector(".main-container");
        modeToggle = document.querySelector(".darkmode");


modeToggle.addEventListener("click", () => {
    nav.classList.toggle("darkgroundcolor");
    main.classList.toggle("darkground");
    body.classList.toggle("allblur");
    modeToggle.classList.toggle("rotate");
});