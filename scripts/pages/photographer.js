//Mettre le code JavaScript lié à la page photographer.html

/**
 * Fonction pour récupérer les photographes à partir d'un json
 * @returns {Promise<{photographers: ({country: string, city: string, price: number, name: string, tagline: string, id: number, portrait: string}|{country: string, city: string, price: number, name: string, tagline: string, id: number, portrait: string})[]}>}
 */
async function getPhotographer(id) {

    // Penser à remplacer par les données récupérées dans le json
    let photographers = [];

    await fetch('http://localhost/fisheye/data/photographers.json')
        .then(response => response.json())
        .then(function (data){
            photographers = data.photographers;
        });

    let photographer = null;

    for (var item in photographers) {
        if(id == photographers[item]['id']){
            photographer = photographers[item];
        }
    }

    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographer: photographer
    })

}

/**
 * Fonction pour récupérer les photos à partir d'un json
 * @returns {Promise<{photographers: ({country: string, city: string, price: number, name: string, tagline: string, id: number, portrait: string}|{country: string, city: string, price: number, name: string, tagline: string, id: number, portrait: string})[]}>}
 */
async function getPhotos() {

    // Penser à remplacer par les données récupérées dans le json
    let photos = [];

    await fetch('http://localhost/fisheye/data/photographers.json')
        .then(response => response.json())
        .then(function (data){
            photos = data.media;
        });



    // et bien retourner le tableau photographers seulement une fois
    return ({
        photos: [...photos]
    })

}

/**
 * Récupère les valeurs des photographes via Json et les affiche
 * @param photographer
 * @returns {Promise<void>}
 */
async function displayData(photographer) {

    document.getElementById('photograph-header-name').innerHTML = photographer.name;
    document.getElementById('photograph-header-localisation').innerHTML = photographer.city + ', ' + photographer.country;
    document.getElementById('photograph-header-slogan').innerHTML = photographer.tagline;
    document.getElementById('photograph-header-image').setAttribute('src', 'assets/photographers/'+photographer.portrait);
    document.getElementById('photograph-price').innerHTML = photographer.price;

    // Récupère la liste des photos et affiches celle du photographe courant
    const photosSection = document.querySelector(".section-gallery");

    const {photos} = await getPhotos();

    let count = 0;

    photos.forEach((photo) => {
        if(photo.photographerId === photographer.id){
            count += photo.likes;
            const photoModel = photoFactory(photo);
            const photoCardDOM = photoModel.getPhotoCardDOM();
            photosSection.appendChild(photoCardDOM);
        }
    });

    document.getElementById('photograph-likes').innerHTML = count;

}

async function init() {

    // Récupère l'id du photographes courant
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id");

    // Récupère les datas des photographes
    const {photographer} = await getPhotographer(id);
    displayData(photographer);

}

function sortSectionGallery(){

    var sortValue = document.getElementById("filter-order").value;

    var items = document.querySelectorAll('.gallery-item');

    [].slice.call(items).sort(function(a, b) {
        var textA = a.getAttribute('data-'+sortValue);
        var textB = b.getAttribute('data-'+sortValue);
        if(sortValue == 'likes'){
            return (parseInt(textA) < parseInt(textB)) ? -1 : (parseInt(textA) > parseInt(textB)) ? 1 : 0;
        } else {
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }

    }).forEach(function(el) {el.parentNode.appendChild(el)});

}

window.onload = function() {

    var likes = document.getElementsByClassName("btn-like");

    var likeAction = function() {
        var count = parseInt(this.getAttribute("data-like"));
        var total = parseInt(document.getElementById("photograph-likes").innerHTML);

        if(count===1){
            document.getElementById("photograph-likes").innerHTML = total+1;
            this.setAttribute('data-like', 0);
            this.setAttribute('src', 'assets/icons/unlike.svg');
        } else {
            document.getElementById("photograph-likes").innerHTML = total-1;
            this.setAttribute('data-like', 1);
            this.setAttribute('src', 'assets/icons/like.svg');
        }

    };

    for (var i = 0; i < likes.length; i++) {
        likes[i].addEventListener('click', likeAction, false);
    }

}




init();
