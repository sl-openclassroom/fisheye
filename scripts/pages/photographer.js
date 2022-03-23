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

init();
