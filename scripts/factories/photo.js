function photoFactory(data, position) {

    const { id, photographerId, title, image, video, likes, date, price } = data;

    const mediaImage = `assets/photographers/${photographerId}/${image}`;
    const mediaVideo = `assets/photographers/${photographerId}/${video}`;

    function getPhotoCardDOM() {

        const item = document.createElement( 'div' );
        item.setAttribute('class', 'gallery-item');
        item.setAttribute('data-title', title);
        item.setAttribute('data-likes', likes);
        item.setAttribute('data-date', date);

        let button = document.createElement( 'button' );
        button.setAttribute('class', 'light-button');
        button.setAttribute('aria-label', title);
        button.setAttribute('onclick', 'openGallery(this)');

        let media = document.createElement( 'img' );
        media.setAttribute("src", mediaImage);
        media.setAttribute("class", 'gallery-item-img');
        media.setAttribute("alt", title);
        media.setAttribute("data-title", title);
        media.setAttribute("data-type", 'img');
        media.setAttribute("data-position", position);

        if(video != null){
            const source = document.createElement( 'source' );
            source.setAttribute("src", mediaVideo);
            source.setAttribute("type", "video/mp4")

            media = document.createElement( 'video' );
            media.setAttribute("playsinline", "");
            media.setAttribute("autoplay", "");
            media.setAttribute("muted", "");
            media.setAttribute("loop", "");
            media.setAttribute("class", 'gallery-item-img');
            media.setAttribute("data-title", title);
            media.setAttribute("alt", title);
            media.setAttribute("src", mediaVideo);
            media.setAttribute("data-type", 'video');
            media.appendChild(source);
        }


        const informations = document.createElement( 'div' );
        informations.setAttribute('class', 'gallery-item-informations');

        const h5 = document.createElement( 'h5' );
        h5.textContent = title;

        const divlikes = document.createElement( 'button' );
        divlikes.setAttribute('class', 'gallery-item-likes btn-like light-button');
        divlikes.setAttribute('data-like', '1');
        divlikes.setAttribute('data-id', id);

        const counter = document.createElement( 'span' );
        counter.setAttribute('class', 'counter');
        counter.setAttribute('id', 'like-'+id);
        counter.textContent = likes;

        const imglike = document.createElement( 'img' );
        imglike.setAttribute("src", 'assets/icons/like.svg')
        imglike.setAttribute('alt', 'likes');

        divlikes.appendChild(counter);
        divlikes.appendChild(imglike);
        informations.appendChild(h5);
        informations.appendChild(divlikes);
        button.appendChild(media);
        item.appendChild(button);
        item.appendChild(informations);

        return (item);
    }

    return { getPhotoCardDOM }

}