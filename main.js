import { renderSignup } from "./js/signup";
import { renderLogin } from "./js/login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./style.css";
import toastr from "toastr";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "toastr/build/toastr.css";
import { renderTaskmanager } from "./js/frontendtaskmanager";

const url = import.meta.env.VITE_URL;
const token = localStorage.getItem("token");
let EDIT_ID = null;

document.querySelector("#app").innerHTML = `
 ${token ? " " : renderLogin()}
 ${token ? " " : renderSignup()}
 ${token ? renderTaskmanager() : " "}
`;
const UserSign = document.getElementById("signup");
const UserLogin = document.getElementById("login");
const UserLogout = document.getElementById("logout");
const UserLogBtn = document.getElementById("logBtn");
const UserSignBtn = document.getElementById("signBtn");
const frontendTaskManager = document.getElementById("frontendTaskmanager");

if (UserSign) document.getElementById("signup").style.display = "none";

if (UserLogBtn)
  document.getElementById("logBtn").addEventListener("click", () => {
    document.getElementById("login").style.display = "block";
    document.getElementById("signup").style.display = "none";
  });

if (UserSignBtn)
  document.getElementById("signBtn").addEventListener("click", () => {
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "block";
  });

if (UserLogout)
  UserLogout.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
  });
if (UserSign)
  UserSign.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();
      const data = new FormData(e.target);
      const json = Object.fromEntries(data.entries());
      console.log(json);
      const response = await fetch(`${url}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });
      const results = await response.json();
      console.log(results);
      if (results.statusCode >= 400) {
        throw new Error(results.message);
      }
      if (results.success) {
        toastr.msg("You have successfully logged in");
        window.location.reload();
      }
    } catch (error) {
      toastr.error(error.message);
    }
  });
if (UserLogin)
  UserLogin.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();
      const data = new FormData(e.target);
      const json = Object.fromEntries(data.entries());
      const response = await fetch(`${url}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });
      const results = await response.json();
      if (results.statusCode >= 400) {
        throw new Error(toastr.message);
      }
      if (results.msg) {
        localStorage.setItem("token", results.token);
        toastr.success("You have successfully logged in");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toastr.error(error.message);
    }
  });
if (frontendTaskManager)
  flatpickr(startDate, { enableTime: true, dateFormat: "Y-m-d H:i" });
flatpickr(endDate, { enableTime: true, dateFormat: "Y-m-d H:i" });
frontendTaskManager.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const data = new FormData(e.target);
    const json = Object.fromEntries(data.entries());
    const seconUrl = EDIT_ID ? `${url}/tasks/${EDIT_ID}` : `${url}/tasks`;
    const response = await fetch(`${seconUrl}`, {
      method: EDIT_ID ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(json),
    });
    const results = await response.json();
    if (results.statusCode >= 400) {
      throw new Error(results.message);
    }
    console.log(results);
    if (results.msg) {
      toastr.success("Task has been created successfully");
    }
  } catch (error) {
    toastr.error(error.message);
  }
  document.getElementById("frontendTaskmanager").reset();

  await INITIAL_EDIT();
});
const GetAllTasks = async () => {
  if (token && frontendTaskManager) {
    const response = await fetch(`${url}/tasks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const results = await response.json();
    if (results.statusCode >= 400) {
      throw new Error(toastr.message);
    }
    if (results.length > 0) {
      document.getElementById("displayData").innerHTML = results.map((task) => {
        return `

               <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto" >
      <div class="fw-bold">Task Name: <span>${task.taskName}</span></div>
      <span><b>Start Date:</b> ${task.startDate}</span><br/>
      <span><b>End Date:</b> ${task.endDate}</span>
    </div>
    <button type="button" class="btn btn-primary" data-id="${task.id}" id="EditButtons">Edit</button>
    <button type="button" class="btn btn-danger l-m" data-id="${task.id}" id="DeleteButtons">Delete</button>
  </li>`;
      });
    }
  }
};

const EDIT = () => {
  const EditButtons = document.querySelectorAll("#EditButtons");
  if (EditButtons.length > 0) {
    EditButtons.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const response = await fetch(`${url}/tasks`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const results = await response.json();
        const isTaskExcist = results.find((item) => item.id == id);
        if (isTaskExcist) {
          EDIT_ID = id;
        }
        document.getElementById("taskName").value = isTaskExcist.taskName;
        flatpickr(document.getElementById("startDate"), {
          defaultDate: new Date(isTaskExcist.startDate),
          dateFormat: "Y-m-d H:i",
          enableTime: true,
        });
        flatpickr(document.getElementById("endDate"), {
          defaultDate: new Date(isTaskExcist.endDate),
          dateFormat: "Y-m-d H:i",
          enableTime: true,
        });
      });
    });
  }
};
const DELETE = async () => {
  const DeleteBtn = document.querySelectorAll("#DeleteButtons");
  if (DeleteBtn.length > 0) {
    DeleteBtn.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const response = await fetch(`${url}/tasks/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const results = await response.json();
        if (results.statusCode >= 400) {
          throw new Error(results.message);
        }
        // await INITIAL_EDIT();
        window.location.reload();
      });
    });
  }
};
const INITIAL_EDIT = async () => {
  await GetAllTasks();
  EDIT();
  DELETE();
};

INITIAL_EDIT();
