import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService, cocktailService } from '../../../_services';

import '../cocktail/cocktail.css';

const CocktailAdd = () => {
    const navigate = useNavigate();
    const [cocktail, setCocktail] = useState({
        user_id: '',
        nom: '',
        description: '',
        recette: ''
    });

    const createCocktail = (event) => {
        setCocktail({
            ...cocktail,
            [event.target.name]: event.target.value
        });
    };

    const cocktailCreateSubmit = (event) => {
        event.preventDefault();
        let {id} = accountService.getTokenInfo();

        cocktail.user_id = id;

        cocktailService.addCocktail(cocktail)
        .then(res => {
            console.log(res);
            navigate('../index');
        })
        .catch(error => console.log(error))
    };

    return (
        <div className='CocktailAdd'>
             <form className='Cocktail' onSubmit={cocktailCreateSubmit}>
            <h1>Ajouter un cocktail</h1>
            <div className='group'>
                <label htmlFor='nom'>Nom</label>
                <input type='text' name='nom' autoComplete='current-nom' value={cocktail.nom} onChange={createCocktail} />
            </div>
            <div className='group'>
                <label htmlFor='description'>Description</label>
                <input type='text' name='description' autoComplete='current-description' value={cocktail.description} onChange={createCocktail} />
            </div>
            <div className='group'>
                <label htmlFor='recette'>Recette</label>
                <input type='text' name='recette' autoComplete='current-recette' value={cocktail.recette} onChange={createCocktail} />
            </div>
            <div className='group'>
                <button>Ajouter</button>
            </div>
        </form>
        </div>
    )
}

export default CocktailAdd;