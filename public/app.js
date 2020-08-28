let list = document.querySelector("#todo-list");
let todoInput = document.querySelector("#todo-in");
let deleteBtn;
let todos = [];
const ID_LENGTH = 6;
const BASE_COLOR = "#3792cb";

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
        let clientId = createRandomId(ID_LENGTH);
        fetch(API_URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ todo_str: todoInput.value, todo_client_id: clientId, todo_color: BASE_COLOR }),
        })
            .then(() => {
                list.insertAdjacentHTML("beforeend", `<li class="list-item" id="${clientId}" style="background-color: ${BASE_COLOR}">${todoInput.value}<button class="delete-btn" id="B-${clientId}" onclick="deleteTask('${clientId}')">X</button><input type="color" onchange="changeColor(this.value, '${clientId}')" class="color-input"></li>`);

                todoInput.value = '';
            })
            .catch(error => {
                console.log(error);
            });
    }
});

function deleteTask(id) {
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

function displayTodos() {
    for (let i = 0; i < todos[0].length; i++) {
        list.insertAdjacentHTML("beforeend", `<li class="list-item" id="${todos[0][i].todo_client_id}" style="background-color: ${todos[0][i].todo_color};">${todos[0][i].todo_str}<button class="delete-btn" id="B-${todos[0][i].todo_client_id}" onclick="deleteTask('${todos[0][i].todo_client_id}')">X</button><input type="color" onchange="changeColor(this.value, '${todos[0][i].todo_client_id}')" class="color-input"></li>`);
        todoId++;
    }
}

function createRandomId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function changeColor(color, id) {
    let API_URL = "http://localhost:3000/update-color/" + id;

    fetch(API_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ todo_client_id: id, todo_color: color }),
    })
        .then(() => {
            element = document.getElementById(id);

            element.style.backgroundColor = color;
        })
        .catch(error => {
            console.log(error);
        });
}