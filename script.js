// Accessing the id from the HTML document
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

// Add Or Update Function
const addOrUpdateTask = () => {
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  };

  localStorage.setItem("data", JSON.stringify(taskData)); // Persist Data once the user adds or update tasks 
  updateTaskContainer();
  reset();
};

const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";
  taskData.forEach(
    ({ id, title, date, description }) => {
        (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button type="button" class="btn" onclick="editTask(this)">Edit</button>
          <button type="button" class="btn"onclick="deleteTask(this)" >Delete</button>
        </div>
      `)
    } 
  );
};

// Delete Task Function
const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id
  );
  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(taskData)); //Remove Task deleted from localStorage


};

// Edit Task Function 
const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);
  currentTask = taskData[dataArrIndex];
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.Date;
  descriptionInput.value = currentTask.description;
  addOrUpdateTaskBtn.innerText = "Update Task";
  taskForm.classList.toggle("hidden");
  currentTask = {};
  
};

// Reset Function
const reset = () => {
  addOrUpdateTaskBtn.innerText ="Add Task";
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};

}

if (taskData.length) {  
  updateTaskContainer();
}

// Opening and closing the form modal
openTaskFormBtn.addEventListener("click", () =>
    taskForm.classList.toggle("hidden")
  );

closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value; // Check if values exist
  const formInputValuesUpdated = titleInput.value !== currentTask.date ||descriptionInput.value !== currentTask.description; // Check if the values change
  if(formInputsContainValues && formInputValuesUpdated ) {
  confirmCloseDialog.showModal(); // display a modal with the Discard and Cancel buttons
  } else {
    reset();
  }
  }); 
cancelBtn.addEventListener("click", () => confirmCloseDialog.close());
discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
    reset();
  });

// Get the values from the input fields, save them into the taskData array, and display them on the page
taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop the browser from refreshing the page
   
// Check if the task being added to the taskData array already exists or not
const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
const taskObj = {
  id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
  title: titleInput.value,
  date: dateInput.value,
  description: descriptionInput.value,
  };

  if(dataArrIndex === -1){
    taskData.unshift(taskObj);
  }
  taskData.forEach(({id, title, date, description}) => {
    (tasksContainer.innerHTML += `
      <div class="task" id="${id}">
      <p><strong>Title:</strong> ${title}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Description:</strong> ${description}</p>
      <button type="button" class="btn">Edit</button>
      <button type="button" class="btn">Delete</button>
      </div>      
    `)
    }
  );
  addOrUpdateTask();
  });
