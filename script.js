document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage if available
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${task}</span>
                <span class="delete" data-index="${index}">Delete</span>
            `;
            taskList.appendChild(listItem);
        });

        // Add event listener to delete tasks
        const deleteButtons = document.querySelectorAll(".delete");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", deleteTask);
        });
    }

    // Add a new task
    function addTask() {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
            renderTasks();
        }
    }

    // Delete a task
    function deleteTask(event) {
        const index = event.target.getAttribute("data-index");
        if (index !== null) {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    }

    // Event listeners
    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Initial render
    renderTasks();
});
