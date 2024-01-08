import Axios from "../_services/caller.service";

let getAllCocktails = () => {
    return Axios.get('/cocktails');
};

let getCocktail = (cid) => {
    return Axios.get('/cocktails/' + cid);
};

let addCocktail = (cocktail) => {
    return Axios.put('/cocktails', cocktail);
};

let updateCocktail = (cocktail) => {
    return Axios.patch('/cocktails/' + cocktail.id, cocktail);
};

let deleteCocktail = (cid => {
    return Axios.delete('/cocktails/' + cid);
});

export const cocktailService = {
    getAllCocktails, getCocktail, addCocktail, updateCocktail, deleteCocktail
};