import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cocktailService } from 'src/_services';

import '../public/public.css';

const Service = () => {
    const [cocktail, setCocktail] = useState({});
    const [isLoad, setLoad] = useState(false);
    let flag = useRef(false);
    let { cid } = useParams();

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