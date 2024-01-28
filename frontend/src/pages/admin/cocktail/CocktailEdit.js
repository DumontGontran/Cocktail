import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { cocktailService } from 'src/_services';

import 'src/pages/admin/cocktail/cocktail.css';

const CocktailEdit = () => {
    const [cocktail, setCocktail] = useState({
        nom: z.string(),
        description: z.string().max(50, 'La description doit contenir au maximum 50 caractères'),
        recette: z.string().max(50, 'La recette doit contenir au maximum 50 caractères')
    });
    const [message, setMessage] = useState();
    const [isLoad, setLoad] = useState(false);
    let navigate = useNavigate();
    const flag = useRef(false);
    const { cid } = useParams();

    const updateCocktail = (event) => {
        setCocktail({
            ...cocktail,
            [event.target.name]: event.target.value
        });
    };

    const cocktailEditSubmit = (event) => {
        event.preventDefault();
        cocktailService.updateCocktail(cocktail)
            .then(_res => {
                navigate('../index');
            })
            .catch(error => setMessage(error.response.data.message))
    };

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

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isLoad) {
        return <h1><FontAwesomeIcon icon={faSpinner} size='xl' className='spinnerIcon' /></h1>
    }

    return (
        <div className='CocktailEdit'>
            <form className='Cocktail' onSubmit={cocktailEditSubmit}>
                <h1>Édition du cocktail</h1>
                <div className='group'>
                    <label htmlFor='nom'>Nom</label>
                    <input type='text' name='nom' autoComplete='current-nom' value={cocktail.nom} onChange={updateCocktail} />
                </div>
                <div className='group'>
                    <label htmlFor='description'>Description</label>
                    <input type='text' name='description' autoComplete='current-description' value={cocktail.description} onChange={updateCocktail} />
                </div>
                <div className='group'>
                    <label htmlFor='recette'>Recette</label>
                    <input type='text' name='recette' autoComplete='current-recette' value={cocktail.recette} onChange={updateCocktail} />
                </div>
                <div className='group'>
                    <button>Modifier</button>
                    <p className='errorMessage'>{message}</p>
                </div>
            </form>
        </div>
    )
}

export default CocktailEdit;