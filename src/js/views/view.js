
import icons from '../../img/icons.svg';

export default class View
{
    _data;

    render(data)
    {
        this._data = data;
        if(!data ||(Array.isArray(data) && data.length === 0)) return this.renderError();

        this._clean();
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
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

    renderError(message = this.errorMessage)
    {
        var _errorMessage =  'We could not find that recipe. Please try another one!';
        

        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}_icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${_errorMessage}</p>
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