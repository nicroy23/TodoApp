let list = document.querySelector("#todo-list");
let todoInput = document.querySelector("#todo-in");
let deleteBtn;
let todos = [];
let cat = [];
const ID_LENGTH = 6;
const BASE_COLOR = "#3792cb";

let todoId = 0;

window.onload = function () {
    const API_URL = 'http://localhost:3000/todos';
    const CATEGORIES_URL = 'http://localhost:3000/categories';

    fetch(CATEGORIES_URL, {
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
            cat.push(responseJson);
            setCategories();
        })
        .catch(error => {
            console.log(error);
        });

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
                list.insertAdjacentHTML("beforeend", `<li class="list-item" id="${clientId}" style="background-color: ${BASE_COLOR}">${todoInput.value}<button class="delete-btn" id="B-${clientId}" onclick="deleteTask('${clientId}')">X</button><select class="category-chooser" onchange="changeCategory(this.value, '${clientId}')"><option value="Category">Category</option><option value="1">${cat[0][0].cat_str}</option><option value="2">${cat[0][1].cat_str}</option><option value="3">${cat[0][2].cat_str}</option><option value="4">${cat[0][3].cat_str}</option><option value="5">${cat[0][4].cat_str}</option></select></li>`);

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
        list.insertAdjacentHTML("beforeend", `<li class="list-item" id="${todos[0][i].todo_client_id}" style="background-color: ${todos[0][i].todo_color};">${todos[0][i].todo_str}<button class="delete-btn" id="B-${todos[0][i].todo_client_id}" onclick="deleteTask('${todos[0][i].todo_client_id}')">X</button><select class="category-chooser" onchange="changeCategory(this.value, '${todos[0][i].todo_client_id}')"><option value="Category" ${isSelected(todos[0][i].todo_color, '#3792cb')}>Category</option><option value="1" ${isSelected(todos[0][i].todo_color, cat[0][0].color)}>${cat[0][0].cat_str}</option><option value="2" ${isSelected(todos[0][i].todo_color, cat[0][1].color)}>${cat[0][1].cat_str}</option><option value="3" ${isSelected(todos[0][i].todo_color, cat[0][2].color)}>${cat[0][2].cat_str}</option><option value="4" ${isSelected(todos[0][i].todo_color, cat[0][3].color)}>${cat[0][3].cat_str}</option><option value="5" ${isSelected(todos[0][i].todo_color, cat[0][4].color)}>${cat[0][4].cat_str}</option></select></li>`);
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

function changeCategory(catId, todoId) {
    if (catId !== 'Category') {
        let fullCatId = 'category' + catId;

        changeColor(document.getElementById(fullCatId).value, todoId);
    } else {
        changeColor('#3792cb', todoId);
    }
}

function setCategories() {
    let el;

    for (let i = 0; i < cat[0].length; i++) {
        el = document.getElementById('category' + cat[0][i].cat_id);
        el.value = cat[0][i].color;
        el = document.getElementById('category' + cat[0][i].cat_id + '-txt');
        el.value = cat[0][i].cat_str;
    }
}

function updateCategColor(id, color) {
    catId = id.substr(-1);
    API_URL = 'http://localhost:3000/update-category-color/' + catId;

    fetch(API_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ color: color }),
    })
        .catch(error => {
            console.log(error);
        });
}

function updateCategoryTitle(id, title) {
    catId = id.charAt(8);
    API_URL = 'http://localhost:3000/update-category-title/' + catId;

    fetch(API_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title }),
    })
        .catch(error => {
            console.log(error);
        });
}

function isSelected(todoColor, catColor) {
    console.log(todoColor);
    console.log(catColor);
    if (todoColor === catColor) {
        return 'selected';
    } else {
        return;
    }
}