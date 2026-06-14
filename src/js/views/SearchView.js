class SearchView {
    _parentEl = document.querySelector('.search');

    getQuery() {
        const query = this._parentEl.querySelector('.search__field').value;
        this._clearinput()
        return query;
    }

    addHandlerSearch(handler) {
        this._parentEl.addEventListener('submit', (e) => {
            e.preventDefault();
            handler();
        });
    }

    _clearinput()
    {
        this._parentEl.querySelector('.search__field').value = '';
    }
}

export default new SearchView();