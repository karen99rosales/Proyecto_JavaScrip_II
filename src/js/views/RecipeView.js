import View from './view';
import icons from '../../img/icons.svg';
// import Fraction from 'fractional';
// const { Fraction: FractionLib } = Fraction;

export default class RecipeView extends View
{
    _parentElement = document.querySelector('.recipe');
    _data;

    render(data)
    {
        this._data = data;
        const markup = this._generateMarkup();
        this._clean;
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    _generateMarkup()
    {
         const markup =  `<figure class="recipe__fig">
          <img src="${this._data.image_url}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}_icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this._data.cooking_time}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}_icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}_icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}_icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}_icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}_icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}_icon-check"></use>
              </svg>
              <div class="recipe__quantity">1000</div>
              <div class="recipe__description">
                <span class="recipe__unit">g</span>
                pasta
              </div>
            </li>

            ${this._data.ingredients
              .map(ing => {
                return `
                  <li class="recipe__ingredient">
                    <svg class="recipe__icon">
                      <use href="${icons}_icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">${ing.quantity ? ing.quantity : ''}</div>
                    <div class="recipe__description">
                      <span class="recipe__unit">${ing.unit}</span>
                      ${ing.description}
                    </div>
                  </li>
                `;
              }).join('')
            }
           
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.source_url}"
            target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}_icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;

        return markup;
    }

    _clean()
    {
        this._parentElement.innerHTML = '';
       
    }

    renderSpinner()
    {
      this._parentElement.innerHTML = '';
      const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}_icon-loader"></use>
          </svg>
        </div>`;
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    addHandlerRender(handler)
    {
        // //Eventos
        //Llamar al cargar la página
        const eventArray = ['load', 'hashchange']
        eventArray.forEach(ev => {
        window.addEventListener(ev, handler);
        });
    }

    renderError(message = this.errorMessage)
    {
        var _errorMessage =  'We could not find that recipe. Please try another one!';

        const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}_icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
        this._clean;
        this._parentElement.insertAdjacentHTML("afterbegin", markup);

    }

    renderMessage(message = this.message)
    {
        var _errorMessage =  'We could not find that recipe. Please try another one!';

        const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}_icon-alert-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
        this._clean;
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
        
    }
}
