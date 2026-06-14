import * as config from './config'
import * as helpers from './helpers'

const state = {
  recipe: {},
};


const loadRecipe = async function(id) 
{

    //https://forkify-api.herokuapp.com/api/v2/recipes/
    try
    {
        console.log("Entro?")
        console.log(`LA URL es ${config.API_URL}${id}`); 
        const URL = `${config.API_URL}${id}`;
        // const resp = await fetch(`${config.API_URL}${id}`);
        // const data = await resp.json();
        // const recipes = data.data.recipe;

        state.recipe = await helpers.getJson(URL);
        
        return state.recipe;
    } 
    catch (ex) 
    {
        alert(`Se tiene un error al obtener la informacion de la API\n ${ex}`);
        
    }
}


export const getState = () => state;

export default loadRecipe