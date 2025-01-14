// 1. DOM Elements
const taskInput = document.getElementById("taskInput");
const taskList = document.querySelector(".task-list");
const enterBtn = document.querySelector(".enter-btn");

// 2. Tasks Array & Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 3. Save to Local Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 4. Create Task Object
function createTask(description) {
  return {
    id: Date.now(),
    description,
    isCompleted: false,
  };
}

// 5. Add New Task
function addTask(description) {
  if (description.trim()) {
    const task = createTask(description);
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
}

// 6. Delete Task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

// 7. Toggle Task Completion
function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
  );
  saveTasks();
  renderTasks();
}

// 8. Create Task Element
function createTaskElement(task) {
  const taskElement = document.createElement("div");
  taskElement.className = `task-item ${
    task.isCompleted ? "completed" : ""
  } fade-in`;

  taskElement.innerHTML = `
        <input 
            type="checkbox" 
            class="task-checkbox" 
            ${task.isCompleted ? "checked" : ""}
        >
        <span class="task-text">${task.description}</span>
        <button class="delete-btn">
            <i class="fas fa-trash"></i>
        </button>
    `;

  // Add Event Listeners
  const checkbox = taskElement.querySelector(".task-checkbox");
  const deleteBtn = taskElement.querySelector(".delete-btn");

  checkbox.addEventListener("change", () => toggleTask(task.id));
  deleteBtn.addEventListener("click", () => deleteTask(task.id));

  return taskElement;
}

// 9. Render Tasks
function renderTasks() {
  taskList.innerHTML = "";

  // Sort tasks: incomplete first, then completed
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) return 0;
    return a.isCompleted ? 1 : -1;
  });

  sortedTasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });
}

// 10. Event Listeners
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask(taskInput.value);
  }
});

enterBtn.addEventListener("click", () => {
  addTask(taskInput.value);
});

// 11. Initial Render
renderTasks();
