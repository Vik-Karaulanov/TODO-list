let todoView = function () {

    const source = document.getElementById("todo-template").innerHTML;
    const template = Handlebars.compile(source);
    const html = template({ todos: todoModel.getAllTodos() }); 

    let taskView = document.getElementById("tasks-view");
    taskView.innerHTML = html;
    
};
