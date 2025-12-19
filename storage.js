const Storage = {
    getCustomUsers() {
        return JSON.parse(localStorage.getItem('customUsers')) || [];
    },

    setCustomUsers(users) {
        localStorage.setItem('customUsers', JSON.stringify(users));
    },

    getCustomTodos() {
        return JSON.parse(localStorage.getItem('customTodos')) || [];
    },

    setCustomTodos(todos) {
        localStorage.setItem('customTodos', JSON.stringify(todos));
    },

    addUser(user) {
        const users = this.getCustomUsers();
        user.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1000;
        users.push(user);
        this.setCustomUsers(users);
        return user;
    },

    deleteUser(userId) {
        let users = this.getCustomUsers();
        users = users.filter(user => user.id !== userId);
        this.setCustomUsers(users);

        let todos = this.getCustomTodos();
        todos = todos.filter(todo => todo.userId !== userId);
        this.setCustomTodos(todos);
    },

    addTodo(todo) {
        const todos = this.getCustomTodos();
        todo.id = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1000;
        todos.push(todo);
        this.setCustomTodos(todos);
        return todo;
    },

    getAllTodos() {
        return [...todosData, ...this.getCustomTodos()];
    },

    getAllUsers() {
        return [...usersData, ...this.getCustomUsers()];
    }
};