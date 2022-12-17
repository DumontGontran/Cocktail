import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cocktailService } from '../../../_services';

import '../cocktail/cocktail.css';

const CocktailEdit = () => {
    const [cocktail, setCocktail] = useState({});
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
        .catch(error => console.log(error))
    };

    useEffect(() => {
        if(flag.current === false) {
            cocktailService.getCocktail(cid)
            .then(res => {
                setTimeout(() => {
                setCocktail(res.data.data);
                setLoad(true);
                }, 1000)
            })
            .catch(error => console.log(error))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    if (!isLoad) {
        return <h1>Loading...</h1>
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
            </div>
        </form>
        </div>
    )
}

export default CocktailEdit;