let list = document.querySelector("#todo-list");
let todoInput = document.querySelector("#todo-in")
//let todos = ["Faire mes devoirs", "Manger des pommes", "Jouer aux jeux video"];

todoInput.addEventListener("keydown", () => {
    if (event.keyCode === 13) {
        list.insertAdjacentHTML("beforeend", `<li class="list-item">${todoInput.value}</li>`);
        todoInput.value = '';
    }
})