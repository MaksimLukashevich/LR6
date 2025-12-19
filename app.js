window.appState = {
    currentPage: 'users',
    searchQuery: ''
};

function init() {
    setupEventListeners();
    
    Navigation.handleHashChange();
}

function setupEventListeners() {

    window.addEventListener('hashchange', () => Navigation.handleHashChange());
    
    document.getElementById('searchBtn').addEventListener('click', () => Search.performSearch());
    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            Search.performSearch();
        }
        Search.performSearch();
    });
    
    document.getElementById('addUserBtn').addEventListener('click', () => {
        document.getElementById('addUserForm').classList.toggle('hidden');
    });
    
    document.getElementById('saveUserBtn').addEventListener('click', saveUser);
    document.getElementById('cancelUserBtn').addEventListener('click', () => {
        document.getElementById('addUserForm').classList.add('hidden');
        Render.clearUserForm();
    });
}

function saveUser() {
    const name = document.getElementById('userName').value.trim();
    const username = document.getElementById('userUsername').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const website = document.getElementById('userWebsite').value.trim();
    
    if (!name || !username || !email) {
        alert('Пожалуйста, заполните обязательные поля: Имя, Username и Email');
        return;
    }
    
    const newUser = {
        name,
        username,
        email,
        phone: phone || 'Не указан',
        website: website || 'Не указан',
        company: { name: 'Custom Company' },
        address: { city: 'Custom City', street: 'Custom Street' }
    };
    
    Storage.addUser(newUser);
    
    document.getElementById('addUserForm').classList.add('hidden');
    Render.clearUserForm();
    
    Navigation.loadPageData();
    
    alert('Пользователь успешно добавлен!');
}

document.addEventListener('DOMContentLoaded', init);