let arr = {
    "ml": [
        {
            "thumb": "img/dataset-cover.jpg",
            "title": "Credit card fraud detection",
            "date": "06/18/2019",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
            "href": ""
        },
        {
            "thumb": "img/weather.jpg",
            "title": "Rain In Australia",
            "date": "07/31/2019",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            "href": ""
        },
        {
            "thumb": "img/7.png",
            "title": "Logistic Regression (Implementaion)",
            "date": "07/19/2019",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            "href": ""
        }
    ],
    //Templates
    "templates": [
        {
            "thumb": "img/tech-mag.png",
            "title": "Magala Blog Magazine Template (Responsive)",
            "date": "05/09/2019",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
            "href": ""
        },
        {
            "thumb": "img/dataset-cover.jpg",
            "title": "Lander Uni. Film Festival Template (Responsive)",
            "date": "08/07/2018",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
            "href": ""
        },
        {
            "thumb": "img/tech-mag.png",
            "title": "Technology Magazine Template",
            "date": "07/30/2018",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
            "href": ""
        },
        {
            "thumb": "img/dataset-cover.jpg",
            "title": "Portfolio Template (Responsive)",
            "date": "07/01/2019",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
            "href": ""
        },
        {
            "thumb": "img/tech-mag.png",
            "title": "Architecture Template (Responsive)",
            "date": "07/01/2019",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
            "href": ""
        },
        {
            "thumb": "img/dataset-cover.jpg",
            "title": "My Blog-Home Screen",
            "date": "10/29/2018",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
            "href": ""
        },
        {
            "thumb": "img/cup-of-couple.png",
            "title": "Cup of Couple",
            "date": "05/09/2018",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
            "href": ""
        }
    ],
    //Featured
    "featured": [
        {
            "thumb": "img/weather.jpg",
            "title": "Rain In Australia",
            "date": "07/31/2019",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
            "href": ""
        },
        {
            "thumb": "img/tech-mag.png",
            "title": "Lander Uni. Film Festival Template",
            "date": "08/07/2018",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            "href": ""
        },
        {
            "thumb": "img/7.png",
            "title": "Logistic Regression (Implementaion)",
            "date": "07/19/2019",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            "href": ""
        }
    ]
}
// keep track of loads
let load_count = 5;
// since featured is automatically loaded it's the first previous tab
// this is to underline current tab and remove underline from previous
let prev_tab = "featured";
let current_tab;
/* MAIN METHOD*/
function load(pointer) {
    let container = document.getElementById('projects_holder');
    //init current tab
    current_tab = pointer
    // Clean the container
    container.innerHTML = ""
    // Remove load button if there is any
    removeLoadButton()
    // Reset load count
    load_count = 5
    // Underline Selected Label
    underlineLabel(pointer)
    // load posts
    loadPosts(arr[pointer], container)
}
function loadPosts(pointer, container) {
    // I do not want to load all projects, limit 4 
    // loadMore function will load more content (>4 projects)
    if (pointer.length < 6) {
        for (let i = 0; i < pointer.length; i++) {
            container.insertAdjacentHTML('beforeend', stringifyProject(pointer[i]));
        }
    } else if (pointer.length >= 6) {
        for (let i = 0; i < pointer.length; i++) {
            container.insertAdjacentHTML('beforeend', stringifyProject(pointer[i]));
            if (i == load_count) {
                // add load button after 6 posts loaded
                addLoadButton(pointer, i)
                break;
            }
        }
    }
}
function loadMorePosts(pointer) {
    let container = document.getElementById('projects_holder');
    for (let i = load_count + 1; i < arr[pointer].length; i++) {
        container.insertAdjacentHTML('beforeend', stringifyProject(arr[pointer][i]));
    }
    load_count = arr[pointer].length
    addLoadButton(arr[pointer], load_count);
}
function stringifyProject(param) {
    return `<div class="project col-6"> <div class="project_body" style="background:linear-gradient(rgba(0,0,0,.8), rgba(198, 198, 198,0.5)), url(${param.thumb}); background-repeat: no-repeat; background-size: 110% 260px;"> <div class="project_info"> <div class="title"> <h3><a href="${param.href}">${param.title}</a></h3> </div> <div class="date"> <span>${param.date}</span> </div> <div class="desc"> <span> ${param.desc} </span> </div> </div> </div> </div>`
}
// Skill labels manipulation function for adding and removing underline
function underlineLabel(pointer) {
    // Unselects the previous label
    document.getElementById(prev_tab).setAttribute("style", "text-decoration: none")
    prev_tab = pointer;
    return document.getElementById(pointer).setAttribute("style", "text-decoration: underline;");
}
// Button Manipulation functions
function addLoadButton(file, index) {
    let container_id = document.getElementById("load_more")
    console.log('file length' + file.length + "\nindex " + index)
    return (file.length == index) ? allLoaded(container_id) : loadMore(container_id);
}
function removeLoadButton() {
    return document.getElementById("load_more").innerHTML = ""
}
function allLoaded(container_id) {
    return container_id.innerHTML = '<p>All loaded</p>'
}
function loadMore(container_id) {
    return container_id.innerHTML = `<button class="btn" onclick="loadMorePosts('${current_tab}')">Load More</button>`
}
function scrollToBottom() {
    return window.scrollTo(0, document.body.scrollHeight)
}
// load featured
load("featured")