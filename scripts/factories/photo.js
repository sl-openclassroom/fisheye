function photoFactory(data) {

    const { id, photographerId, title, image, likes, date, price } = data;

    const picture = `assets/photographers/${photographerId}/${image}`;

    function getPhotoCardDOM() {

        const item = document.createElement( 'div' );
        item.setAttribute('class', 'gallery-item');

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const informations = document.createElement( 'div' );
        informations.setAttribute('class', 'gallery-item-informations');

        const h5 = document.createElement( 'h5' );
        h5.textContent = title;

        const divlikes = document.createElement( 'div' );
        divlikes.setAttribute('class', 'gallery-item-likes');

        const counter = document.createElement( 'span' );
        counter.setAttribute('class', 'counter');
        counter.textContent = likes;

        const imglike = document.createElement( 'img' );
        imglike.setAttribute("src", 'assets/icons/like.svg')
        imglike.setAttribute('alt', 'likes');


        divlikes.appendChild(counter);
        divlikes.appendChild(imglike);
        informations.appendChild(h5);
        informations.appendChild(divlikes);
        item.appendChild(img);
        item.appendChild(informations);

        return (item);
    }

    return { getPhotoCardDOM }

}