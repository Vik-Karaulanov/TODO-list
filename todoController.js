(function () {
    let addTodoBtn = document.getElementById('add-todo-btn');
    let todoInput = document.getElementById('todo');
    let clearBtn = document.getElementById('clear');

    let generateView = function (todos) {

        const source = document.getElementById("todo-template").innerHTML;
        const template = Handlebars.compile(source);
        const html = template({ todos });
    
        let taskView = document.getElementById("tasks-view");
        taskView.innerHTML = html;
        
    };

    if (todoModel.getAllTodos()) {
        generateView(todoModel.getAllTodos());
    }

    addTodoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (todoInput.value) {
            todoModel.addTodo(todoInput.value);
            todoInput.value = '';
            generateView(todoModel.getAllTodos());
        }
    })

    clearBtn.addEventListener('click', () => {
        let allTodos = document.querySelectorAll('.task-container');
        allTodos.forEach(el => {
            let delBtn = el.querySelector('button');
            delBtn.classList.add('hidden');
            el.classList.add('task-container-done');
        });
        todoModel.deleteAllTodos();
        //printing when transitionend event is triggered.
    });


    function onListToggle(element){
        let task = element.parentElement;
        if (task.className === 'task-container') {
            let text = task.firstElementChild;
            text.classList.toggle('done');
            todoModel.toggleTodo(task.id);
        }
    }

    function onRemoveClick(element) {
        if (element.className === 'removeBtn') {
            element.classList.add('hidden');
            let parent = element.parentElement;
            parent.classList.add('task-container-done');
            todoModel.deleteTodo(element.parentElement.id);
            //printing when transitionend event is triggered.
            // parent.addEventListener('transitionend', function () {
            //     generateView(todoModel.getAllTodos());
            // });
        }
    }

    window.addEventListener('transitionend', function () {
        generateView(todoModel.getAllTodos());
    });

    window.addEventListener('click', (e) => {
        e.stopPropagation();
        onListToggle(e.target);
        onRemoveClick(e.target)
    });

})();