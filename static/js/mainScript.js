////////////////////////////// Bling.js ///////////////////////////////////////////////////////////////

window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
    this.addEventListener(name, fn);
}

NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = function (name, fn) {
    this.forEach(function (elem, i) {
        elem.on(name, fn);
    });
}

///////////////////////////////////////////////Observers///////////////////////////////////////////////

// observer navbar
let hero = $('.heroSlider');
let llamanos = $('.llamanos');
let navbar = $('.navbar');

let navObserver = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
        llamanos.style["display"] = "block";
        navbar.classList.toggle('has-background-primary');
        navbar.classList.toggle('has-background-primary');
        navbar.classList.toggle('opanav');
        navbar.classList.toggle('animated');
        navbar.classList.toggle('slideInDown');
    } else {
        llamanos.style["display"] = "none";
        navbar.classList.toggle('has-background-primary');
        navbar.classList.toggle('has-background-primary');
        navbar.classList.toggle('opanav');
        navbar.classList.toggle('animated');
        navbar.classList.toggle('slideInDown');
    }
});

navObserver.observe(hero);

// oberber slides
let explicaciones = $$('.firstContent .is-two-thirds');
let allcolumns = $$('.firstContent .is-two-thirds');

const slideIn = target => {
    const expObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (target.getAttribute('lado') == 'izquierdo') {
                    target.classList += ' animated slideInLeft';
                    observer.disconnect();
                } else {
                    target.classList += ' animated slideInRight';
                    observer.disconnect();
                }
            }
        });

    });
    expObserver.observe(target);
};

allcolumns.forEach(slideIn);


// oberber iconos
let firstContent = $('.heroe');
let iconsToMove = $$('.iconos i');

iconsToMove.forEach((icon, index) => {
    icon.style["animation-delay"] = (((index + 1) * 200) + 1500) + "ms";
});

let iconsObserver = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
        iconsToMove.forEach((icon, index) => {
            icon.classList.add('animated');
            icon.classList.add('bounce');
        });
    } else {
        iconsToMove.forEach((icon, index) => {
            icon.classList.remove('animated');
            icon.classList.remove('bounce');
        });
    }
});

iconsObserver.observe(firstContent);

///////////////////////////////////////////////////////////////////////////////////////////////////////

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

/////////////////////////////////////////////////Always top////////////////////////////////////////////

window.on('load', function () {

    let heroes = $$('.hero');

    // heroes[0].style.background = "url(/images/Cabecera9.jpg)"
    // heroes[1].style.background = "url(/images/Cabecera6.jpg)"
    // heroes[2].style.background = "url(/images/Cabecera.jpg)"

    let topOffset = $('.heroSlider').offsetHeight;


    let myLoader = $('.loaderMine');
    myLoader.classList += ' animated fadeOut';
    myLoader.on('animationend', () => {
        myLoader.parentNode.removeChild(myLoader);
    });

    const $navbarBurgers = Array.prototype.slice.call($$('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.on('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = $(`#${target}`);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

    $$('.notification .delete').forEach(($delete) => {
        let $notification = $delete.parentNode;
        $delete.on('click', () => {
            $notification.classList += ' animated fadeOut';
            $notification.on('animationend', () => {
                $notification.parentNode.removeChild($notification);
            });
        });
    });

    let allIcons = $$('.iconos .icon');
    allIcons.forEach(icon => {
        icon.on('click', function () {
            $('.notificaciones').innerHTML = "";
            $('.notificaciones').innerHTML = this.nextSibling.nextSibling.innerHTML;
            $$('.notification .delete').forEach(($delete) => {
                let $notification = $delete.parentNode;
                $delete.on('click', () => {
                    $notification.classList += ' animated fadeOut';
                    $notification.on('animationend', () => {
                        $notification.parentNode.removeChild($notification);
                    });
                });
            });
        });
    });

    $$('.tabs li').forEach(elem => {
        elem.on('click', () => {
            $$('.tabs li').forEach(innerElem => {
                innerElem.classList.remove('is-active');
            });
            elem.classList += ' is-active';
            console.log(elem.firstElementChild.nextElementSibling);
            $('.nosotros-text').innerHTML = elem.firstElementChild.nextElementSibling.innerHTML;
        });
    });

});