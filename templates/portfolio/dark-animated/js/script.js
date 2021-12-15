function apiPromise(method, url, data) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        if ('withCredentials' in request) {
            request.open(method, url, true);
        } else if (typeof XDomainRequest != 'undefined') {
            request = new XDomainRequest();
            request.open(method, url);
        } else {
            request = null;
        }
        request.onload = function () {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                reject(Error('Interaction failed:' + request.statusText));
            }
        };
        request.onerror = function () {
            reject(Error('Network error.'));
        };
        request.send((isFormData(data)) ? data : toFormData(data));
    });
}
function isFormData(obj) {
    return (obj instanceof FormData) ? true : false;
}
function objectifyForm(form) {
    var data = {};
    var fields = form.querySelectorAll('[name]');
    if (!isIterable(fields))
        return false;
    fields.forEach(function (field) {
        // We don't pass readonly
        if (field.readOnly)
            return false;
        // Does this field have no value?
        if (typeof field.value == 'undefined')
            return false;
        // Is this a CHECKED item?
        if ((field.type == 'checkbox' || field.type == 'radio') && !field.checked)
            return false;
        if (field.name == null) {
            field.name = field.getAttribute('name');
        }
        // This shouldn't have slipped in
        if (field.name == null)
            return false;
        var dataName = field.name.replace('[]', '');
        if (field.name.includes('[]')) {
            // Is an array field
            if (data[dataName] == null) {
                data[dataName] = [];
            }
        }
        if (field.value != null && field.value != '') {
            var value = isNaN(field.value) ? field.value.valueOf() : parseFloat(field.value);
            if (Array.isArray(data[dataName])) {
                data[dataName].push(value);
            } else {
                data[dataName] = value;
            }
        }
    });
    var ckEditors = form.querySelectorAll('.ck-editor'); // There's a loaded CK Editor instance
    if (ckEditors.length > 0) {
        ckEditors.forEach(function (cke) {
            var ckeID = cke.previousElementSibling.id;
            var ckeName = cke.previousElementSibling.getAttribute('name');
            var ckeVal = window.ckeditors[ckeID].getData();
            if (ckeVal != null) {
                data[ckeName] = ckeVal;
            }
        });
    }
    return data;
}
function isEmpty(str) {
    return str.replace(/^\s+|\s+$/g, '').length == 0;
}
function isIterable(obj) {
    // checks for null and undefined
    if (obj == null)
        return false;
    return typeof obj[Symbol.iterator] === 'function';
}
function toFormData(item) {
    var formData = new FormData();
    if (isElement(item)) {
        if (item.tagName === 'FORM') {
            item = objectifyForm(item);
        }
    }
    if (typeof item === 'object') {
        Object.keys(item).forEach(function (key) {
            if (item[key] !== null && item[key] !== '') {
                //item[key] = JSON.stringify(item[key]);
                if (Array.isArray(item[key]) || typeof item[key] === 'object') {
                    item[key] = JSON.stringify(item[key]);
                }
                formData.append(key, item[key]);
            }
        });
    } else {
        return false;
    }
    return formData;
}
function isElement(obj) {
    try {
        return obj instanceof HTMLElement;
    } catch (e) {
        return (typeof obj === 'object') &&
            (obj.nodeType === 1) && (typeof obj.style === 'object') &&
            (typeof obj.ownerDocument === 'object');
    }
}
function queryStringToObject(queryString) {
    var urlParams = new URLSearchParams(queryString);
    return paramsToObject(urlParams.entries());
}
function paramsToObject(entries) {
    var result = {};
    for (var entry of entries) {
        var [key, value] = entry;
        result[key] = value;
    }
    return result;
}
function isJson(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;
    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }
    return (typeof item === "object" && item !== null) ? true : false
}
function ajaxSubmit(form, e) {
    e.preventDefault();
    var submit = form.querySelector('[name="submit"]');
    submit.classList.add('loading');
    apiPromise('POST', form.getAttribute('action'), form).then(function (response) {
        console.log(response);
        submit.classList.remove('loading');
        submit.classList.add('removing');
        setTimeout(function () {
            submit.innerText = 'Thanks, I\'ll be in touch!';
            submit.classList.remove('removing');
            submit.removeAttribute('name');
            submit.setAttribute('disabled', 'disabled');
        }, 351);
    }).catch(function (reason) {
        console.log(reason);
        alert('Something went wrong. Please email me at info@xhynk.com');
        submit.classList.remove('loading');
    });
}
var simulateClick = function (elem) {
    // Create our event (with options)
    var evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    // If cancelled, don't dispatch our event
    var canceled = !elem.dispatchEvent(evt);
};
// Blobby!
var c = document.getElementById('wave'),
    ctx = c.getContext('2d'),
    cw = c.width,
    ch = c.height,
    points = [],
    tick = 0,
    opt = {
        count: 10,
        range: {
            x: 10,
            y: 20
        },
        duration: {
            min: 40,
            max: 180
        },
        thickness: 0,
        strokeColor: '#191b21',
        level: .1,
        curved: true
    },
    rand = function (min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    },
    ease = function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };
ctx.lineJoin = 'round';
ctx.lineWidth = opt.thickness;
ctx.strokeStyle = opt.strokeColor;
ctx.imageSmoothingEnabled;
var Point = function (config) {
    this.anchorX = config.x;
    this.anchorY = config.y;
    this.x = config.x;
    this.y = config.y;
    this.setTarget();
};
Point.prototype.setTarget = function () {
    this.initialX = this.x;
    this.initialY = this.y;
    this.targetX = this.anchorX + rand(0, opt.range.x * 2) - opt.range.x;
    this.targetY = this.anchorY + rand(0, opt.range.y * 2) - opt.range.y;
    this.tick = 0;
    this.duration = rand(opt.duration.min, opt.duration.max);
}
Point.prototype.update = function () {
    var dx = this.targetX - this.x;
    var dy = this.targetY - this.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (Math.abs(dist) <= 0) {
        this.setTarget();
    } else {
        var t = this.tick;
        var b = this.initialY;
        var c = this.targetY - this.initialY;
        var d = this.duration;
        this.y = ease(t, b, c, d);
        b = this.initialX;
        c = this.targetX - this.initialX;
        d = this.duration;
        this.x = ease(t, b, c, d);
        this.tick++;
    }
};
Point.prototype.render = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
    ctx.fillStyle = '#191b21';
    ctx.fill();
};
var updatePoints = function () {
    var i = points.length;
    while (i--) {
        points[i].update();
    }
};
var renderPoints = function () {
    var i = points.length;
    while (i--) {
        points[i].render();
    }
};
var renderShape = function () {
    ctx.beginPath();
    var pointCount = points.length;
    ctx.moveTo(points[0].x, points[0].y);
    var i;
    for (i = 0; i < pointCount - 1; i++) {
        var c = (points[i].x + points[i + 1].x) / 2;
        var d = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
    }
    ctx.lineTo(-opt.range.x - opt.thickness, ch + opt.thickness);
    ctx.lineTo(cw + opt.range.x + opt.thickness, ch + opt.thickness);
    ctx.closePath();
    ctx.fillStyle = '#191b21';
    ctx.fill();
    ctx.stroke();
};
var clear = function () {
    ctx.clearRect(0, 0, cw, ch);
};
var loop = function () {
    window.requestAnimFrame(loop, c);
    tick++;
    clear();
    updatePoints();
    renderShape();
};
var i = opt.count + 2;
var spacing = (cw + (opt.range.x * 2)) / (opt.count - 1);
while (i--) {
    points.push(new Point({
        x: (spacing * (i - 1)) - opt.range.x,
        y: ch - (ch * opt.level)
    }));
}
window.requestAnimFrame = function () { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) { window.setTimeout(a, 1000) } }();
loop();
// Look-er At-er
var container = document.querySelector('#container');
var profile = document.querySelector('#profile');
var sections = document.querySelector('#section-container');
var clappy = document.querySelector('.applause-container');
document.body.onmousemove = function (e) {
    var range = { x: 3, y: 6 }, // Maxmimum degrees of deflection
        x = event.clientX,
        y = event.clientY,
        width = window.innerWidth,
        height = window.innerHeight,
        center = { x: width / 2, y: height / 2 },
        r1, r2, rY, rX; // For use later
    r1 = (x > center.x) ? x - center.x : (center.x - x) * -1;
    r2 = (y > center.y) ? (y - center.y) * -1 : center.y - y;
    rY = (r1 / center.x) * range.x;
    rX = (r2 / center.y) * range.y;
    container.style.transform = 'rotateY(' + rY + 'deg) ' +
        'rotateX(' + rX + 'deg) ';
    container.style.transformOrigin = r1 * .025 + '% ' + r2 * -.025 + '%';
    profile.style.transform = 'translateX(' + rY / 1.1 + '%) ' +
        'translateY(' + rX / 1.1 * -1 + '%) ';
    sections.style.transform = 'translateX(' + rY / 2.5 + '%) ' +
        'translateY(' + rX / 2.5 * -1 + '%) ';
    clappy.style.transform = 'translateX(' + rY / .7 + '%) ' +
        'translateY(' + rX / .7 * -1 + '%) ';
};
document.body.addEventListener('mouseleave', function (e) {
    //document.body.classList.add('no-look');
    //container.removeAttribute('style');
    //sections.removeAttribute('style');
    //profile.removeAttribute('style');
});
document.body.addEventListener('mouseenter', function (e) {
    setTimeout(function () {
        document.body.classList.remove('no-look');
    }, 350);
});
var audiotypes = {
    "mp3": "audio/mpeg",
    "mp4": "audio/mp4",
    "ogg": "audio/ogg",
    "wav": "audio/wav"
}
function ss_soundbits(sound) {
    var audio_element = document.createElement('audio');
    if (audio_element.canPlayType) {
        for (var i = 0; i < arguments.length; i++) {
            var source_element = document.createElement('source');
            source_element.setAttribute('src', arguments[i]);
            /*if (arguments[i].match(/\.(\w+)$/i))
                    source_element.setAttribute('type', audiotypes[RegExp.$1])*/
            audio_element.setAttribute('type', 'audio/x-m4a');
            audio_element.appendChild(source_element);
        }
        audio_element.load();
        audio_element.playclip = function () {
            //audio_element.pause()
            audio_element.currentTime = 0;
            audio_element.play();
        };
        return audio_element;
    }
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function generateParticles(el, min, max, timeout, sizing) {
    min = min ? min : 12;
    max = max ? max : 24;
    sizing = sizing ? sizing : 6;
    timeout = timeout ? timeout : 0;
    var number = randomInt(min, max);
    var colors = ["#0095ee", "#ee3d69", "#0350b9", "#DDCA60"];
    var particle;
    for (var i = 0; i < number; i++) {
        particle = document.createElement("span");
        particle.classList.add("particle");
        el.insertBefore(particle, el.firstChild);
    }
    var particles = el.querySelectorAll('.particle');
    particles.forEach(function (particle) {
        var size = Math.floor(Math.random() * sizing) + sizing / 2;
        var color = colors[Math.floor(Math.random() * colors.length)];
        var x = randomInt(200, 550) * randomInt(-1, 1);
        var y = randomInt(200, 550) * randomInt(-1, 1);
        var xform = randomInt(2, 4);
        var opacity = xform - 0.25;
        var top = randomInt(0, el.offsetHeight) / 2;
        var left = randomInt(0, el.offsetWidth) / 2;
        var t = randomInt(0, 1) ? '+' : '-';
        var l = randomInt(0, 1) ? '+' : '-';
        particle.style.top = 'calc(50% ' + t + ' ' + top + 'px)';
        particle.style.left = 'calc(50% ' + l + ' ' + left + 'px)';
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.background = color;
        particle.style.transition = "transform " + xform + "s cubic-bezier(0,1,.4,1), opacity " + opacity + "s ease-in-out";
        particle.style.opacity = 0;
        particle.style.transform = "translate(" + x + "%, " + y + "%) scale(0)";
        setTimeout(function () {
            particle.remove();
        }, 1000);
    });
}
var clickUpsound = ss_soundbits('music/Button 4.m4a'),
    clickDownsound = ss_soundbits('music/Button 6.m4a'),
    awardSound = ss_soundbits('music/Success 2.m4a'),
    alertSound = ss_soundbits('music/Alert 3.m4a'),
    alertSound2 = ss_soundbits('music/Alert 4.m4a');
var clapTimer;                  // Timer identifier
var doneClappingInterval = 750; // Time in ms
function applaud(el, e) {
    if (e.button == null || e.button == 1)
        return false;
    var dir = 1;
    dir = (e.button == 0) ? 1 : -1;
    var claps = parseInt(el.getAttribute('data-claps'));
    var totalClaps = el.querySelector('.total-claps');
    if (claps <= 0 && dir == -1)
        return false;
    if (claps >= 10 && dir == 1)
        return false;
    var newTotal = parseInt(totalClaps.innerText.replace(/,/g, '')) + dir;
    totalClaps.innerText = Intl.NumberFormat('en-US').format(newTotal);
    if (claps == 9 && dir == 1) {
        //generateParticles(el, 12, 24, 0, 18);
        generateParticles(el, 48, 64, 0, 22);
        awardSound.playclip();
    } else if (claps == 10 && dir == -1) {
        alertSound.playclip();
    } else {
        if (dir == 1) {
            generateParticles(el, 6, 12, 0, 18);
            clickUpsound.playclip();
        } else {
            clickDownsound.playclip();
        }
    }
    el.setAttribute('data-claps', parseInt(claps) + dir);
    if (typeof clapTimer !== 'undefined')
        clearTimeout(clapTimer);
    clapTimer = setTimeout(function () {
        // SEND VIA POST TO DATABASE
    }, doneClappingInterval);
}
var menu = document.querySelector('nav');
var pages = document.querySelectorAll('#section-container > section');
if (menu != null) {
    var menuItems = menu.querySelectorAll('nav > a');
    if (menuItems.length > 0) {
        menuItems.forEach(function (menuItem) {
            menuItem.onclick = function (e) {
                // Reset the menu and pages
                for (i = 0, n = menuItems.length; i < n; i++) {
                    menuItems[i].classList.remove('active');
                }
                for (i = 0, n = pages.length; i < n; i++) {
                    pages[i].classList.add('invisible');
                }
                this.classList.add('active');
                var activePage = this.innerText.toLowerCase();
                var page = document.querySelector('#' + activePage);
                if (page != null) {
                    page.classList.remove('invisible');
                }
            };
        });
    }
}