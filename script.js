const form = document.querySelector("form");
const inputTask = document.querySelector(".inputTask");
const inputReward = document.querySelector(".inputReward");
const filter = document.querySelector(".filter");
const list = document.querySelector(".list");

form.addEventListener("submit", addTask);
list.addEventListener("click", nextDone);
filter.addEventListener("click", filterTasks);

function addTask(e) {
  e.preventDefault();

  if (inputTask.value && inputReward.value) {
    //list item
    const item = document.createElement("li");

    //first part - task - with button
    const itemTask = document.createElement("span");
    itemTask.classList.add("itemTask");
    itemTask.innerHTML = `${inputTask.value}`;
    const btnTask = document.createElement("button");
    btnTask.classList.add("btnTask");
    btnTask.setAttribute("type", "button");
    btnTask.innerHTML = "<i class='fas fa-arrow-right'></i>";

    //second part - reward - with button
    const itemReward = document.createElement("span");
    itemReward.classList.add("itemReward");
    itemReward.classList.add("incompleted");
    itemReward.innerHTML = `${inputReward.value}`;
    const btnReward = document.createElement("button");
    btnReward.classList.add("btnReward");
    btnReward.setAttribute("type", "button");
    btnReward.classList.add("btnDisabled");
    btnReward.setAttribute("disabled", "");
    btnReward.innerHTML = "<i class='fas fa-check'></i>";

    //append
    item.appendChild(itemTask);
    item.appendChild(btnTask);
    item.appendChild(itemReward);
    item.appendChild(btnReward);
    list.appendChild(item);

    inputTask.value = "";
    inputReward.value = "";
  }
}

function nextDone(e) {
  let item = e.target;
  if (item.classList[0] === "btnTask") {
    item.previousElementSibling.classList.toggle("completed");
    item.nextElementSibling.classList.toggle("incompleted");
    item.parentNode.classList.toggle("taskDone");
    item.parentNode.lastElementChild.toggleAttribute("disabled");
    item.parentNode.lastElementChild.classList.toggle("btnDisabled");
    item.classList.toggle("btnDisabled");
  } else if (item.classList[0] === "btnReward") {
    item.parentElement.remove();
  }
}

function filterTasks(e) {
  list.childNodes.forEach(function (i) {
    if (i.nodeName === "LI") {
      switch (e.target.value) {
        case "All":
          i.style.display = "flex";
          break;
        case "Rewards":
          if (i.classList.contains("taskDone")) {
            i.style.display = "flex";
          } else {
            i.style.display = "none";
          }
          break;
        case "Tasks":
          if (!i.classList.contains("taskDone")) {
            i.style.display = "flex";
          } else {
            i.style.display = "none";
          }
          break;
      }
    }
  });
}
