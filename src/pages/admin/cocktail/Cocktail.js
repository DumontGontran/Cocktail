import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { accountService, cocktailService } from '../../../_services';

import '../cocktail/cocktail.css';

const Cocktail = () => {
    const [cocktails, setCocktails] = useState([]);
    const flags = useRef(false);
    const {id} = accountService.getTokenInfo();

    useEffect(() => {
        if(flags.current === false) {
        cocktailService.getAllCocktails()
            .then(res => {
                setCocktails(res.data.data);
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
                                <td>{cocktail.id}</td>
                                <td>{cocktail.nom}</td>
                                <td>{cocktail.description}</td>
                                <td>{cocktail.createdAt.split('T')[0].split('-').reverse().join('-')}</td>
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