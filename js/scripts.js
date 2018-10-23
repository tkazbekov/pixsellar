let features = document.getElementById('features');
let featureItems = document.getElementsByClassName('feature');
let log = () => {
    if (window.scrollY >= (features.offsetTop - 300)) {
        window.removeEventListener('scroll', log, true);
        toggleFeatures(featureItems);
    }
};
let toggleFeatures = elements => {
    elements = Array.from(elements);
    elements = elements.map(el => el.className += ' feature--expanded')
}
window.addEventListener('scroll', log, true);

let navlinks = Array.from(document.getElementsByClassName('nav__link'))
let scrollSmooth = link => {
    link.addEventListener('click', (event) => {
        let href = link.getAttribute('href').replace('#', '');
        let el = document.getElementById(href);
        window.scroll({
            top: el.offsetTop,
            left: 0,
            behavior: 'smooth'
        });
        event.preventDefault();
    })
}
window.onload = () => {
    scrollSmooth(document.querySelector('.welcome__arrow'));
    navlinks.map(link => {
        scrollSmooth(link);
    });
}


let formHandle = document.querySelector('form[name="modalform"]')

new Validator(formHandle, function (err, res) {
    return res;
})

let openModal = () => {
    let modal = document.getElementById('modal');
    modal.className += " modal--opened";
    document.querySelector('.modal__backdrop').addEventListener('click', () => {
        modal.className = "modal";
    })
}

/*** ANIMATION FOR DEMOS ***/

let demos = Array.from(document.getElementsByClassName('demo'));

let showDemo = () => {
    demos.map(demo => {
        if (isInViewPort(demo) && demo.className !== "demo demo--visible") {
            demo.className += " demo--visible"
        }
    })
}
let isInViewPort = (el) => {
    // return true
    let bounding = el.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
window.addEventListener('scroll', showDemo)

let more = () => {
    window.scroll({
        top: document.getElementById('features').offsetTop,
        left: 0,
        behavior: 'smooth'
    });
}