function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const link = document.createElement( 'a' );
        link.setAttribute('href', 'photographer.html?id='+id);

        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const localisation = document.createElement( 'div' );
        localisation.textContent = city + ', ' + country;
        localisation.className = 'localisation';

        const slogan = document.createElement( 'div' );
        slogan.textContent = tagline;
        slogan.className = 'slogan';

        const pricing = document.createElement( 'div' );
        pricing.textContent = price + '€/jour';
        pricing.className = 'price';

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(localisation);
        article.appendChild(slogan);
        article.appendChild(pricing);
        link.appendChild(article);
        return (link);
    }
    return { name, picture, getUserCardDOM }
}