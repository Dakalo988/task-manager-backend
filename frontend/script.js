const API_URL = "http://localhost:5000/api/tasks";

const taskForm = document.getElementById("taskForm");
const tasksDiv = document.getElementById("tasks");

async function fetchTasks() {
  const response = await fetch(API_URL);
  const result = await response.json();

  tasksDiv.innerHTML = "";

  result.data.forEach((task) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Status: ${task.status}</p>
      <button onclick="deleteTask(${task.id})">Delete</button>
      <hr />
    `;

    tasksDiv.appendChild(div);
  });
}

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newTask = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    status: document.getElementById("status").value,
  };

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });

  taskForm.reset();
  fetchTasks();
});

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  fetchTasks();
}

fetchTasks();