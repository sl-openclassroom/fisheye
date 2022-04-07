function photoFactory(data) {

    const { id, photographerId, title, image, video, likes, date, price } = data;

    const mediaImage = `assets/photographers/${photographerId}/${image}`;
    const mediaVideo = `assets/photographers/${photographerId}/${video}`;

    function getPhotoCardDOM() {

        const item = document.createElement( 'div' );
        item.setAttribute('class', 'gallery-item');
        item.setAttribute('data-title', title);
        item.setAttribute('data-likes', likes);
        item.setAttribute('data-date', date);

        let media = document.createElement( 'img' );
        media.setAttribute("src", mediaImage)

        if(video != null){
            const source = document.createElement( 'source' );
            source.setAttribute("src", mediaVideo);
            source.setAttribute("type", "video/mp4")

            media = document.createElement( 'video' );
            media.setAttribute("playsinline", "");
            media.setAttribute("autoplay", "");
            media.setAttribute("muted", "");
            media.setAttribute("loop", "");
            media.appendChild(source);
        }


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
        imglike.setAttribute('class', 'btn-like');
        imglike.setAttribute('data-like', '1');


        divlikes.appendChild(counter);
        divlikes.appendChild(imglike);
        informations.appendChild(h5);
        informations.appendChild(divlikes);
        item.appendChild(media);
        item.appendChild(informations);

        return (item);
    }

    return { getPhotoCardDOM }

}