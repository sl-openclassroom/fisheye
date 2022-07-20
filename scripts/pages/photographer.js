//Mettre le code JavaScript lié à la page photographer.html

/**
 * Fonction pour récupérer les photographes à partir d'un json
 * @returns {Promise<{photographers: ({country: string, city: string, price: number, name: string, tagline: string, id: number, portrait: string}|{country: string, city: string, price: number, name: string, tagline: string, id: number, portrait: string})[]}>}
 */
async function getPhotographer(id) {

    // Penser à remplacer par les données récupérées dans le json
    let photographers = [];

    await fetch('/data/photographers.json')
        .then(response => response.json())
        .then(function (data){
            photographers = data.photographers;
        });

    let photographer = null;

    for (let item in photographers) {
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

    await fetch('/data/photographers.json')
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
    document.getElementById('photograph-header-image').setAttribute('alt', photographer.name);
    document.getElementById('photograph-price').innerHTML = photographer.price;

    // Récupère la liste des photos et affiches celle du photographe courant
    const photosSection = document.querySelector(".section-gallery");

    const {photos} = await getPhotos();

    let count = 0;
    let position = 1;

    photos.forEach((photo) => {
        if(photo.photographerId === photographer.id){
            count += photo.likes;
            const photoModel = photoFactory(photo, position);
            const photoCardDOM = photoModel.getPhotoCardDOM();
            photosSection.appendChild(photoCardDOM);
            position += 1;
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

    let sortValue = document.getElementById("filter-order").value;

    let items = document.querySelectorAll('.gallery-item');

    [].slice.call(items).sort(function(a, b) {
        let textA = a.getAttribute('data-'+sortValue);
        let textB = b.getAttribute('data-'+sortValue);
        if(sortValue == 'likes'){
            return (parseInt(textA) < parseInt(textB)) ? -1 : (parseInt(textA) > parseInt(textB)) ? 1 : 0;
        } else {
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }

    }).forEach(function(el) {el.parentNode.appendChild(el)});


}

window.onload = function() {

    // GESTION DES CLICKS SUR LES LIKES
    let likes = document.getElementsByClassName("btn-like");

    let likeAction = function() {

        let count = parseInt(this.getAttribute("data-like"));
        let id = this.getAttribute("data-id");
        let total = parseInt(document.getElementById("photograph-likes").innerHTML);
        let current = parseInt(document.getElementById("like-"+id).innerHTML);
        let img = this.getElementsByTagName('img')[0];

        if(count===1){
            document.getElementById("photograph-likes").innerHTML = total+1;
            document.getElementById("like-"+id).innerHTML = current+1;
            this.setAttribute('data-like', 0);
            img.setAttribute('src', 'assets/icons/unlike.svg');
        } else {
            document.getElementById("photograph-likes").innerHTML = total-1;
            document.getElementById("like-"+id).innerHTML = current-1;
            this.setAttribute('data-like', 1);
            img.setAttribute('src', 'assets/icons/like.svg');
        }

    };

    for (let i = 0; i < likes.length; i++) {
        likes[i].addEventListener('click', likeAction, false);
    }

}


function openGallery(object){

    let img = object.getElementsByTagName('img')[0];
    let modal = document.getElementById("gallery_modal");

    if(img.getAttribute('data-type') == 'img'){
        document.getElementById("gallery-video").classList.add('d-none');
        document.getElementById("gallery-img").classList.remove('d-none');
        document.getElementById("gallery-img").src = img.getAttribute('src');
    } else {
        document.getElementById("gallery-img").classList.add('d-none');
        document.getElementById("gallery-video").classList.remove('d-none');
        document.getElementById("gallery-video").src = img.getAttribute('src');
    }

    document.getElementById("gallery-title").innerHTML = img.getAttribute('data-title');
    document.getElementById("gallery-previous").setAttribute('src-current', img.getAttribute('data-position'));
    document.getElementById("gallery-next").setAttribute('src-current', img.getAttribute('data-position'));
    modal.style.display = "flex";

}

document.onkeydown = (e) => {
    e = e || window.event;
    if (e.keyCode === 37) {
        document.getElementById('gallery-previous').click();
    } else if (e.keyCode === 39) {
        document.getElementById('gallery-next').click();
    } else if (e.keyCode === 27) {
        document.getElementById('gallery-close').click();
        document.getElementById('contact_modal_close').click();
    } else if (e.keyCode === 13) {
        document.getElementById('contact_modal_send').click();
    }
}

init();
