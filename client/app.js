let list = document.querySelector("#todo-list");
let todoInput = document.querySelector("#todo-in");
let deleteBtn;
let todos = [];

let todoId = 0;

window.onload = function () {
    const API_URL = 'http://localhost:3000/todos';

    fetch(API_URL, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            todos.push(responseJson);
            displayTodos();
        })
        .catch(error => {
            console.log(error);
        });
};

todoInput.addEventListener("keydown", () => {
    const API_URL = 'http://localhost:3000/todos';

    if (event.keyCode === 13) {
        fetch(API_URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ todo_str: todoInput.value, todo_client_id: todoId }),
        })
            .then(() => {
                list.insertAdjacentHTML("beforeend", `<li class="list-item" id="${todoId}">${todoInput.value}<button class="delete-btn" id="btn${todoId}" onclick="deleteTask(${todoId})">X</button></li>`);

                todoInput.value = '';
                todoId++;
            })
            .catch(error => {
                console.log(error);
            });
    }
});

let deleteTask = function (id) {
    API_URL = "http://localhost:3000/delete-todo/" + id;

    fetch(API_URL, {
        method: "DELETE",
    })
        .then(() => {
            let toDelete = document.getElementById(id.toString());

            toDelete.outerHTML = '';
        })
        .catch(error => {
            console.log(error);
        });
}

let displayTodos = function () {
    for (let i = 0; i < todos[0].length; i++) {
        list.insertAdjacentHTML("beforeend", `<li class="list-item" id="${todoId}">${todos[0][i].todo_str}<button class="delete-btn" id="btn${todoId}" onclick="deleteTask(${todoId})">X</button></li>`);
        todoId++;
    }
}
