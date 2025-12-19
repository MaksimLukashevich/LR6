const Navigation = {
    handleHashChange() {
        const hash = window.location.hash;
        
        if (hash === '#users') {
            window.appState.currentPage = 'users';
        } else if (hash === '#users#todos') {
            window.appState.currentPage = 'todos';
        } else if (hash === '#users#posts') {
            window.appState.currentPage = 'posts';
        } else if (hash === '#users#posts#comments') {
            window.appState.currentPage = 'comments';
        } else {
            window.appState.currentPage = 'users';
            window.location.hash = '#users';
        }
        
        this.updateBreadcrumbs();
        this.renderCurrentPage();
        this.loadPageData(); 
    },

    updateBreadcrumbs() {
        const breadcrumbs = document.getElementById('breadcrumbs');
        let breadcrumbsHTML = '<a href="#users">Пользователи</a>';
        
        switch (window.appState.currentPage) {
            case 'todos':
                breadcrumbsHTML += ' > <span>Задачи</span>';
                break;
            case 'posts':
                breadcrumbsHTML += ' > <span>Посты</span>';
                break;
            case 'comments':
                breadcrumbsHTML += ' > <a href="#users#posts">Посты</a> > <span>Комментарии</span>';
                break;
        }
        
        breadcrumbs.innerHTML = breadcrumbsHTML;
    },

    renderCurrentPage() {
        document.getElementById('usersPage').classList.add('hidden');
        document.getElementById('todosPage').classList.add('hidden');
        document.getElementById('postsPage').classList.add('hidden');
        document.getElementById('commentsPage').classList.add('hidden');
        
        document.getElementById(`${window.appState.currentPage}Page`).classList.remove('hidden');
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === window.appState.currentPage) {
                link.classList.add('active');
            }
        });
    },

    loadPageData() {
        const searchQuery = document.getElementById('searchInput').value.trim();
        
        switch (window.appState.currentPage) {
            case 'users':
                const allUsers = Storage.getAllUsers();
                Render.renderUsers(allUsers, searchQuery);
                break;
            case 'todos':
                const allTodos = Storage.getAllTodos();
                Render.renderTodos(allTodos, searchQuery);
                break;
            case 'posts':
                Render.renderPosts(postsData, searchQuery);
                break;
            case 'comments':
                Render.renderComments(commentsData, searchQuery);
                break;
        }
    }
};