let todoModel = (function () {

    class Todos {
        constructor(todo, id) {
            this.todo = todo;
            this.id = id;
            this.isDone = false;
        }
    }

    class TodoModel {

        constructor() {
            this.todoList = JSON.parse(localStorage.getItem('TodoList')) || [];
        }
        addTodo(todo) {
            let id = this.todoList.length > 0 ? this.todoList[this.todoList.length - 1].id + 1 : 1;
            this.todoList.push(new Todos(todo, id));
            localStorage.setItem('TodoList', JSON.stringify(this.todoList));
        }
        deleteTodo(id) {
            this.todoList = this.todoList.filter(el => el.id !== parseInt(id));
            localStorage.setItem('TodoList', JSON.stringify(this.todoList));
        }
        getAllTodos() {
            return this.todoList;
        }
        deleteAllTodos() {
            this.todoList = [];
            localStorage.setItem('TodoList', JSON.stringify(this.todoList));
        }
        toggleTodo(id) {
            this.todoList.map(el => {
                if (el.id === parseInt(id)) {
                    el.isDone === false ? el.isDone = true : el.isDone = false
                }
            })
            localStorage.setItem('TodoList', JSON.stringify(this.todoList));
        }
    }

    return new TodoModel();

})();