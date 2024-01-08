import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cocktailService } from '../../_services';
import { cocktail0, cocktail1, cocktail2, cocktail4, cocktail5 } from '../../components/public/images';

import '../public/public.css';

const Service = () => {
    const [cocktail, setCocktail] = useState({});
    const [isLoad, setLoad] = useState(false);
    let flag = useRef(false);
    let { cid } = useParams();

    const getRandomImage = (arr) => {
        const randomIndex = Math.floor(Math.random(1 * arr.length) * arr.length);
        const image = arr[randomIndex];

        return image;
    }

    const cocktailImages = [cocktail0, cocktail1, cocktail2, cocktail4, cocktail5];
    const image = getRandomImage(cocktailImages);

    useEffect(() => {
        if (flag.current === false) {
            cocktailService.getCocktail(cid)
                .then(res => {
                    setTimeout(() => {
                        setCocktail(res.data.data);
                        setLoad(true);
                    }, 1500)
                })
                .catch(error => console.log(error))
        }

        return () => flag.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isLoad) {
        return <h1><FontAwesomeIcon icon={faSpinner} size='xl' className='spinnerIcon' /></h1>
    }

    return (
        <div className='Service'>
            <img src={image} alt={cocktail.nom} />
            <h1>{cocktail.nom}</h1>
            <p>Description: {cocktail.description}</p>
            <p>Recette: {cocktail.recette}</p>
            <span>Créé par: {cocktail.User.pseudo}</span>
            <span>Créé le: {cocktail.createdAt.split('T')[0].split('-').reverse().join('-')}</span>
            <span>Mis à jour le: {cocktail.updatedAt.split('T')[0].split('-').reverse().join('-')}</span>
        </div>
    );
};

export default Service;