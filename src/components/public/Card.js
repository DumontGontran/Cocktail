import React from 'react';
import { Link } from 'react-router-dom';

import '../public/card.css';

const Card = ({ ckt, image }) => {
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