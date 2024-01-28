import React from 'react';
import { Link } from 'react-router-dom';
import { cocktail0, cocktail1, cocktail2, cocktail3, cocktail4, cocktail5 } from 'src/components/public/images';

import 'src/components/public/card.css';

const Card = ({ ckt }) => {
    const getRandomImage = (arr) => {
        let randomIndex = Math.floor(Math.random() * arr.length);
        const image = arr[randomIndex++];

        return image;
    }

    const cocktailImages = [cocktail0, cocktail1, cocktail2, cocktail3, cocktail4, cocktail5];
    const image = getRandomImage(cocktailImages);

    return (
        <Link to={`/service/${ckt.id}`} className='CardLink'>
            <article className='CardArticle'>
                <img src={image} alt={ckt.nom} />
                <h1>{ckt.nom}</h1>
                <p>Description: {ckt.description}</p>
                <span>Créé le: {ckt.createdAt.split('T')[0].split('-').reverse().join('-')}</span>
            </article>
        </Link>
    )
}

export default Card;