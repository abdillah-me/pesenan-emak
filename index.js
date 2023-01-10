const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#input-todo");
const todoList = document.querySelector("#list-todo");
const popup = document.querySelector("#popup");

window.addEventListener("click", () => {
   popup.classList.add("hidden");
});

let todos = [];
let EditTodosId = -1;
form.addEventListener("submit", (event) => {
   event.preventDefault();
   saveTodo();
   renderTodo();
});

// function
const saveTodo = () => {
   const todoValue = todoInput.value;

   const isEmpty = todoValue === "";
   if (isEmpty) {
      alert("value kosong");
   } else {
      if (EditTodosId >= 0) {
         todos = todos.map((todo, index) => {
            return {
               ...todo,
               value: index === EditTodosId ? todoValue : todo.value,
            };
         });
         EditTodosIdo = -1;
      } else {
         todos.push({
            value: todoValue,
         });
      }
      todoInput.value = "";
   }
};

const renderTodo = () => {
   todoList.innerHTML = "";
   todos.map((todo, index) => {
      todoList.innerHTML += `
         <div
            id=${index}
            class="w-full shadow-md p-3 flex justify-between mt-2 border border-teal-700 rounded-sm"
         >
            <div class="pesenan w-3/4">
               <h3 class="font-semibold">${todo.value}</h3>
            </div>
            <div class="action flex justify-end gap-3 w-3/4">
               <button data-action="edit" class="bg-yellow-400 px-3 rounded-full text-white text-xs">Edit</button>
               <button data-action="delete" class="bg-red-500 px-3 rounded-full text-white text-xs">delete</button>
            </div>
         </div>
      `;
   });
};

todoList.addEventListener("click", (event) => {
   const target = event.target;
   const parenElement = target.parentNode.parentNode;
   const todoId = Number(parenElement.id);

   const action = target.dataset.action;
   action === "edit" && editTodo(todoId);
   action === "delete" && deleteTodo(todoId);
});

// edit todo
const editTodo = (todoId) => {
   todoInput.value = todos[todoId].value;
   EditTodosId = todoId;
};

// delte
const deleteTodo = (todoId) => {
   todos = todos.filter((todo, index) => {
      return index !== todoId;
   });
   EditTodosId = -1;
   renderTodo();
};
