import React, { useEffect, useState, useRef } from 'react';
import Card from '../../components/public/Card';
import { cocktailService } from '../../_services';

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
                    }, 1000);
                })
                .catch(error => console.log(error))
        }

        return () => flag.current = true;
    }, [])

    if (!isLoad) {
        return <h1>Chargement...</h1>
    }

    return (
        <div className='Home'>
            {
                cocktails.map((ckt) => (
                    <Card key={ckt.id} ckt={ckt} image='https://cdn-elle.ladmedia.fr/var/plain_site/storage/images/elle-a-table/fiches-cuisine/tous-les-themes/recettes-de-cocktail/788840-9-fre-FR/Recettes-de-cocktail.jpg' />
                ))
            }
        </div>
    );
};

export default Home;