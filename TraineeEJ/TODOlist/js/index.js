// ############seleção de elementos

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseButton = document.querySelector("#erase-button");
const filterSelect = document.querySelector("#filter-select");
const todos = document.querySelectorAll(".todo")
const filterList = document.getElementById('todo-list').querySelectorAll('.todo');



let oldInputValue;

// ###############funções

const saveTodo = (text) => {

    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
}

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    })
}


//###########events

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue)
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest("div")
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
        parentEl.style.display = "flex";
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }

    cancelEditBtn.addEventListener("click", (e) => {
        e.preventDefault();

        toggleForms();
    })
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if (editInputValue) {
        updateTodo(editInputValue)
    }
    toggleForms();
})

searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const todos = todoList.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const title = todo.querySelector("h3").innerText.toLocaleLowerCase();

        if (title.includes(searchTerm)) {
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }
    });
});

eraseButton.addEventListener("click", () => {
    searchInput.value = "";
    const todos = todoList.querySelectorAll(".todo");

    todos.forEach((todo) => {
        todo.style.display = "flex";
    });
});

  
  
  
  
  
  
  


