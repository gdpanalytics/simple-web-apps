document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-button");
  addButton.addEventListener("click", function () {
    const taskName = document.getElementById("task-input").value.trim();
    const taskDesc = document.getElementById("task-desc-input").value.trim();
    if (taskName && taskDesc) {
      addTask(taskName, taskDesc);
      document.getElementById("task-input").value = "";
      document.getElementById("task-desc-input").value = "";
    } else {
      alert("Insert a name and a description.");
    }
  });
});

function addTask(taskName, taskDesc) {
  const tableBody = document
    .getElementById("tasks-table")
    .getElementsByTagName("tbody")[0];
  const newRow = tableBody.insertRow();

  const taskCell = newRow.insertCell();
  const descCell = newRow.insertCell();
  const actionsCell = newRow.insertCell();

  taskCell.textContent = taskName;
  descCell.textContent = taskDesc;
  actionsCell.className = "actions";

  // bottone "edit"
  const editButton = createActionButton("✏️", "edit", () =>
    editTask(taskCell, descCell)
  );

  // bottone "rimuovi"
  const removeButton = createActionButton("🗑️", "remove", () =>
    tableBody.removeChild(newRow)
  );

  // bottone "done"
  const doneButton = createActionButton("✅", "done", () =>
    newRow.classList.toggle("completed")
  );

  actionsCell.appendChild(editButton);
  actionsCell.appendChild(removeButton);
  actionsCell.appendChild(doneButton);
}

function createActionButton(icon, className, eventHandler) {
  const button = document.createElement("button");
  button.innerHTML = icon;
  button.className = className;
  button.addEventListener("click", eventHandler);
  return button;
}

function editTask(taskCell, descCell) {
  // verifica se edit mode
  let taskInput = taskCell.querySelector("input");
  let descInput = descCell.querySelector("input");

  if (taskInput && descInput) {
    // in edit mode
    taskCell.textContent = taskInput.value;
    descCell.textContent = descInput.value;
  } else {
    // non in edit mode
    taskInput = document.createElement("input");
    descInput = document.createElement("input");

    taskInput.type = "text";
    descInput.type = "text";
    taskInput.value = taskCell.textContent.trim();
    descInput.value = descCell.textContent.trim();

    taskInput.className = "task-edit-input";
    descInput.className = "desc-edit-input";

    taskCell.innerHTML = "";
    descCell.innerHTML = "";
    taskCell.appendChild(taskInput);
    descCell.appendChild(descInput);

    taskInput.focus();

    // salva quando viene perso il focus
    taskInput.addEventListener("blur", function () {
      taskCell.textContent = taskInput.value;
    });

    descInput.addEventListener("blur", function () {
      descCell.textContent = descInput.value;
    });

    // salva "on enter"
    taskInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        taskInput.blur();
      }
    });

    descInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        descInput.blur();
      }
    });
  }
}

function createActionButton(icon, className, eventHandler) {
  const button = document.createElement("button");
  button.innerHTML = icon;
  button.className = className;
  button.removeEventListener("click", eventHandler);
  button.addEventListener("click", eventHandler);
  return button;
}
