const Render = {
    renderUsers(users, searchQuery = '') {
        const usersList = document.getElementById('usersList');
        
        if (!users.length) {
            usersList.innerHTML = '<div class="empty-state"><h3>Пользователи не найдены</h3></div>';
            return;
        }

        let filteredUsers = users;
        if (searchQuery) {
            filteredUsers = users.filter(user => 
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (!filteredUsers.length) {
            usersList.innerHTML = '<div class="empty-state"><h3>Пользователи не найдены</h3></div>';
            return;
        }

        usersList.innerHTML = filteredUsers.map(user => `
            <div class="user-card">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                        <h3>${user.name}</h3>
                        <div class="user-details">
                            <p><strong>Username:</strong> ${user.username}</p>
                            <p><strong>Email:</strong> ${user.email}</p>
                            <p><strong>Phone:</strong> ${user.phone}</p>
                            <p><strong>Website:</strong> ${user.website}</p>
                            <p><strong>Company:</strong> ${user.company?.name || 'N/A'}</p>
                            <p><strong>Address:</strong> ${user.address?.city || 'N/A'}, ${user.address?.street || 'N/A'}</p>
                        </div>
                    </div>
                    ${user.id >= 1000 ? `
                        <button class="btn btn-danger delete-user" data-user-id="${user.id}">Удалить</button>
                    ` : ''}
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.delete-user').forEach(button => {
            button.addEventListener('click', (e) => {
                const userId = parseInt(e.target.dataset.userId);
                if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
                    Storage.deleteUser(userId);
                    const allUsers = Storage.getAllUsers();
                    this.renderUsers(allUsers, searchQuery);
                }
            });
        });
    },

    renderTodos(todos, searchQuery = '') {
        const todosList = document.getElementById('todosList');
        const allUsers = Storage.getAllUsers();

        if (!todos.length) {
            todosList.innerHTML = '<div class="empty-state"><h3>Задачи не найдены</h3></div>';
            return;
        }

        let filteredTodos = todos;
        if (searchQuery) {
            filteredTodos = todos.filter(todo => 
                todo.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (!filteredTodos.length) {
            todosList.innerHTML = '<div class="empty-state"><h3>Задачи не найдены</h3></div>';
            return;
        }

        todosList.innerHTML = filteredTodos.map(todo => {
            const user = allUsers.find(u => u.id === todo.userId);
            const userName = user ? user.name : 'Неизвестный пользователь';
            
            return `
                <div class="todo-item">
                    <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} disabled>
                    <div class="todo-title ${todo.completed ? 'todo-completed' : ''}">
                        <strong>${userName}:</strong> ${todo.title}
                    </div>
                </div>
            `;
        }).join('');
    },

    renderPosts(posts, searchQuery = '') {
        const postsList = document.getElementById('postsList');
        const allUsers = Storage.getAllUsers();

        if (!posts.length) {
            postsList.innerHTML = '<div class="empty-state"><h3>Посты не найдены</h3></div>';
            return;
        }

        let filteredPosts = posts;
        if (searchQuery) {
            filteredPosts = posts.filter(post => 
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.body.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (!filteredPosts.length) {
            postsList.innerHTML = '<div class="empty-state"><h3>Посты не найдены</h3></div>';
            return;
        }

        postsList.innerHTML = filteredPosts.map(post => {
            const user = allUsers.find(u => u.id === post.userId);
            const userName = user ? user.name : 'Неизвестный пользователь';
            
            return `
                <div class="post-item">
                    <div class="post-title">${post.title}</div>
                    <div class="user-details" style="margin-bottom: 10px;">
                        <strong>Автор:</strong> ${userName}
                    </div>
                    <div class="post-body">${post.body.replace(/\n/g, '<br>')}</div>
                </div>
            `;
        }).join('');
    },

    renderComments(comments, searchQuery = '') {
        const commentsList = document.getElementById('commentsList');
        const allPosts = postsData;
        const allUsers = Storage.getAllUsers();

        if (!comments.length) {
            commentsList.innerHTML = '<div class="empty-state"><h3>Комментарии не найдены</h3></div>';
            return;
        }

        let filteredComments = comments;
        if (searchQuery) {
            filteredComments = comments.filter(comment => 
                comment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                comment.body.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (!filteredComments.length) {
            commentsList.innerHTML = '<div class="empty-state"><h3>Комментарии не найдены</h3></div>';
            return;
        }

        commentsList.innerHTML = filteredComments.map(comment => {
            const post = allPosts.find(p => p.id === comment.postId);
            const postTitle = post ? post.title : 'Неизвестный пост';
            
            return `
                <div class="comment-item">
                    <div class="comment-name">${comment.name}</div>
                    <div class="comment-email">${comment.email}</div>
                    <div class="user-details" style="margin-bottom: 10px;">
                        <strong>Пост:</strong> ${postTitle}
                    </div>
                    <div class="comment-body">${comment.body.replace(/\n/g, '<br>')}</div>
                </div>
            `;
        }).join('');
    },

    clearUserForm() {
        document.getElementById('userName').value = '';
        document.getElementById('userUsername').value = '';
        document.getElementById('userEmail').value = '';
        document.getElementById('userPhone').value = '';
        document.getElementById('userWebsite').value = '';
    }
};