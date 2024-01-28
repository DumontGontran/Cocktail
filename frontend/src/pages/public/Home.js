import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useRef } from 'react';
import Card from 'src/components/public/Card';
import { cocktailService } from 'src/_services';

const Home = () => {
    const [cocktails, setCocktails] = useState([]);
    const flag = useRef(false);
    const [isLoad, setLoad] = useState(false);

    useEffect(() => {
        if (flag.current === false) {
            cocktailService.getAllCocktails()
                .then(res => {
                    setTimeout(() => {
                        setCocktails(res.data.data);
                        setLoad(true);
                    }, 1500);
                })
                .catch(error => console.log(error))
        }

        return () => flag.current = true;
    }, [])

    if (!isLoad) {
        return <h1><FontAwesomeIcon icon={faSpinner} size='xl' className='spinnerIcon' /></h1>
    }

    return (
        <div className='Home'>
            {
                cocktails.map((ckt) => (
                    <Card key={ckt.id} ckt={ckt} />
                ))
            }
        </div>
    );
};

export default Home;