import * as config from './config'
import * as helpers from './helpers'
import { TIMEOUT_SEC } from './config.js';
import { RES_PER_PAGE } from './config';

const state = {
  recipe: {},
  search: 
    {
        query : "",
        result : {},
        page : 1,
        resultsPerPage : RES_PER_PAGE
    },
};


const loadRecipe = async function(id) 
{

    //https://forkify-api.herokuapp.com/api/v2/recipes/
    try
    {
        console.log("Entro?")
        console.log(`LA URL es ${config.API_URL}/${id}`); 
        const URL = `${config.API_URL}/${id}`;

        state.recipe = await helpers.getJson(URL);
        state.recipe = state.recipe.recipe;
        console.log(state.recipe)
        return state.recipe.recipe;
    } 
    catch (ex) 
    {
        alert(`Se tiene un error al obtener la informacion de la API\n ${ex}`);
        //throw
    }
}

export const loadSearchResults = async function(query)
{
    try {
        const url = `${config.API_URL}?search=${query}`;
        const data = await helpers.getJson(url);
        
        // Es vital validar que 'data.data.recipes' existe antes de hacer el map
       state.search.result = data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });

        // ¡ESTO ES LO QUE TE FALTA!
        return state.search.result;
    } catch(err) {
        throw err; // Propaga el error para que el controlador lo maneje
    }

}

export const getSearchResultsPage = function(page = state.search.page) 
{
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  console.log("Esto" + state.search.result.slice(start, end))
  return state.search.result.slice(start, end);
}
//loadSeachResults("pizza");


export const getState = () => state;

export default loadRecipe