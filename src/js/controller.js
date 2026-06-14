import { render } from 'sass';
import loadRecipe from './model.js';
import * as model from './model.js';
import RecipeView from './views/RecipeView.js'
import SearchView from './views/SearchView.js';
import resultsView from './views/ResultView.js';

const recipeView = new RecipeView();

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//Funcion Asincrona ShowRecipe
const controlRecipes = async function()
{
  try
  {
    var id = window.location.hash.slice(1);
    console.log(id.trim());

    if(id === null || id === "")
    {
      console.log(`Se tiene un error al obtener el ID de la receta "${id}"`);
      return;
    }

    
    recipeView.renderSpinner();

    //Llamar a otro archivo
    const respon = await loadRecipe(id);
    
    const currentState = model.getState();
    const recipe = currentState.recipe;
    console.log(recipe);

    recipeView.render(recipe);
  }
  catch(ex)
  {
    recipeView.renderError(ex)
    //alert(`Se tiene un error  de la API\n ${ex}`);
  }
}

// function renderSpinner(parentEl)
// {
//   parentEl.innerHTML = "";
//   const markup = `
//     <div class="spinner">
//       <svg>
//         <use href="${icons}#icon-loader"></use>
//       </svg>
//     </div>`;
//   parentEl.insertAdjacentHTML("afterbegin", markup);
// }
//showRecipe();



const controlSearchResults = async function() {
  try {
    const query = SearchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

     var result = await model.loadSearchResults(query);
     console.log(result);

    resultsView.render(model.getState().search.result);
  } catch (err) {
    console.error(err);
  }
}

function init()
{
  recipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
}

init();