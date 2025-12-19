const Search = {
    performSearch() {
        Navigation.loadPageData(); 
    },

    clearSearch() {
        document.getElementById('searchInput').value = '';
        this.performSearch();
    }
};