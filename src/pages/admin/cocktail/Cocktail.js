import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import { accountService, cocktailService } from '../../../_services';

import '../cocktail/cocktail.css';

const Cocktail = () => {
    const [cocktails, setCocktails] = useState([]);
    const [isLoad, setLoad] = useState(false);
    const flags = useRef(false);
    const { id } = accountService.getTokenInfo();

    useEffect(() => {
        if (flags.current === false) {
            cocktailService.getAllCocktails()
                .then(res => {
                    setTimeout(() => {
                        setCocktails(res.data.data);
                        setLoad(true);
                    }, 1000)
                })
                .catch(error => console.log(error))
        }

        return () => flags.current = true;
    }, []);

    const delCocktail = (cocktailId) => {
        cocktailService.deleteCocktail(cocktailId)
            .then(res => {
                console.log(res);
                setCocktails((current) => current.filter(cocktail => cocktail.id !== cocktailId));
            })
            .catch(error => console.log(error))
    };

    if (!isLoad) {
        return <h1><FontAwesomeIcon icon={faSpinner} size='lg' className='spinnerIcon' /></h1>
    }
    return (
        <div className='Cocktail'>
            <h1>Liste des cocktails</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Date de création</th>
                        <th>Édition</th>
                        <th>Suppression</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cocktails.map(cocktail => (
                            <tr key={cocktail.id}>
                                <td data-label='ID'>{cocktail.id}</td>
                                <td data-label='Nom'>{cocktail.nom}</td>
                                <td data-label='Description'>{cocktail.description}</td>
                                <td data-label='Date de création'>{cocktail.createdAt.split('T')[0].split('-').reverse().join('-')}</td>
                                {cocktail.user_id === id &&
                                    <>
                                        <td><Link to={`../edit/${cocktail.id}`}><FontAwesomeIcon icon={faEdit} size='lg' className='cocktailEditIcon' /></Link></td>
                                        <td><span onClick={() => delCocktail(cocktail.id)}><FontAwesomeIcon icon={faTrash} size='lg' className='cocktailDeleteIcon' /></span></td>
                                    </>}
                                {cocktail.user_id !== id &&
                                    <>
                                        <td></td>
                                        <td></td>
                                    </>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Cocktail;