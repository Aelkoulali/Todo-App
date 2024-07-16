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

// Opening and closing the form modal
openTaskFormBtn.addEventListener("click", () =>
    taskForm.classList.toggle("hidden")
  );

closeTaskFormBtn.addEventListener("click", () => {
    confirmCloseDialog.showModal(); // display a modal with the Discard and Cancel buttons
  }); 
cancelBtn.addEventListener("click", () => confirmCloseDialog.close());
discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
    taskForm.classList.toggle("hidden");
  });

// Get the values from the input fields, save them into the taskData array, and display them on the page
taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop the browser from refreshing the page
    
});  

// Check if the task being added to the taskData array already exists or not
const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);