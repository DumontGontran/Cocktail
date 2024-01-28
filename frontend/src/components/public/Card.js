import React from 'react';
import { Link } from 'react-router-dom';

import 'src/components/public/card.css';

const Card = ({ ckt }) => {
    return (
        <Link to={`/service/${ckt.id}`} className='CardLink'>
            <article className='CardArticle'>
                <h1>{ckt.nom}</h1>
                <p>Description: {ckt.description}</p>
                <span>Créé le: {ckt.createdAt.split('T')[0].split('-').reverse().join('-')}</span>
            </article>
        </Link>
    )
}

export default Card;