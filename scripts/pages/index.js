/**
 * Fonction pour récupérer les photographes à partir d'un json
 * @returns {Promise<{photographers: ({country: string, city: string, price: number, name: string, tagline: string, id: number, portrait: string}|{country: string, city: string, price: number, name: string, tagline: string, id: number, portrait: string})[]}>}
 */
async function getPhotographers() {

    // Penser à remplacer par les données récupérées dans le json
    let photographers = [];

    await fetch('/data/photographers.json')
        .then(response => response.json())
        .then(function (data){
            photographers = data.photographers;
        });

    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: [...photographers]
    })

}

/**
 * Récupère les valeurs des photographes via Json et les affiche
 * @param photographers
 * @returns {Promise<void>}
 */
async function displayData(photographers) {

    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });

}

async function init() {
    // Récupère les datas des photographes
    const {photographers} = await getPhotographers();
    displayData(photographers);
}

init();
