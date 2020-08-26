let list = document.querySelector("#todo-list");
let todoInput = document.querySelector("#todo-in");
let deleteBtn;
//let todos = ["Faire mes devoirs", "Manger des pommes", "Jouer aux jeux video"];

let todoId = 0;

todoInput.addEventListener("keydown", () => {
    if (event.keyCode === 13) {
        list.insertAdjacentHTML("beforeend", `<li class="list-item" id="${todoId}">${todoInput.value}<button class="delete-btn" id="btn${todoId}" onclick="deleteTask(${todoId})">X</button></li>`);
        
        todoInput.value = '';
        todoId++;
    }
});

let deleteTask = function(id) {
    let toDelete = document.getElementById(id.toString());

    toDelete.outerHTML = '';
}
