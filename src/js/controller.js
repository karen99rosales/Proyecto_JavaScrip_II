import { render } from 'sass';
import loadRecipe from './model.js';
import * as model from './model.js';
import RecipeView from './views/RecipeView.js'
//const recipeContainer = document.querySelector('.recipe');

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

    const recipeView = new RecipeView();
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
    alert(`Se tiene un error  de la API\n ${ex}`);
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

// //Eventos
//Llamar al cargar la página
const eventArray = ['load', 'hashchange']
eventArray.forEach(ev => {
  window.addEventListener(ev, controlRecipes);
});
