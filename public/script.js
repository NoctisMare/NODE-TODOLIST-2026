// alert("connected");

const titleInputSection = document.getElementById("title");
const addTodoBtn = document.getElementById("add-todo");

function getTitleInput() {
  const result = titleInputSection.value;
  if (!result) {
    throw new Error("Error empty title feild.");
  }
  return result;
}

addTodoBtn.addEventListener("click", async () => {
  try {
    const title = getTitleInput();
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });
    const res = await response.json();
    if (response.ok) {
      console.log("SUCCESS:", res.message);
      getLatest();
    } else {
      console.log("FAILURE:", res.message);
    }
  } catch (error) {
    console.error(error.message);
  }
});

const STATUS = Object.freeze({
  COMPLETED: "completed",
  PENDING: "pending",
});

class Item {
  #id;
  #title;
  #status;

  constructor(id, title, status = STATUS.PENDING) {
    this.#id = id;
    this.#title = title;
    this.#status = status;
  }

  async #toggle() {
    try {
      const response = await fetch(`/api/${this.#id}`, { method: "PATCH" });
      const res = await response.json();
      if (response.ok) {
        console.log("SUCCESS:", res.message);
        getLatest();
      } else {
        console.log("FAILURE:", res.message);
      }
    } catch (error) {
      console.log("Error toggling status. ERR:", error.message || error);
    }
  }

  async #delete() {
    try {
      const response = await fetch(`/api/${this.#id}`, { method: "DELETE" });
      const res = await response.json();
      if (response.ok) {
        console.log("SUCCESS:", res.message);
        getLatest();
      } else {
        console.log("FAILURE:", res.message);
      }
    } catch (error) {
      console.log("Error toggling status. ERR:", error.message || error);
    }
  }

  #getToggleBtn() {
    const toggleBtn = document.createElement("button");
    toggleBtn.setAttribute("class", "complete-btn");
    toggleBtn.innerText = this.#status;
    toggleBtn.addEventListener("click", () => {
      if (this.#status === STATUS.PENDING) {
        this.#toggle();
      }
    });
    return toggleBtn;
  }
  #getDeleteBtn() {
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "delete-btn");
    deleteBtn.innerText = "delete";
    deleteBtn.addEventListener("click", () => {
      this.#delete();
    });
    return deleteBtn;
  }

  createElement(id) {
    const element = document.createElement("div");
    element.setAttribute("class", "item");
    element.innerHTML = `
        <p class="id">${id}</p>
        <p class="title">${this.#title}</p>
        <p class="status">${this.#status}</p>
    `;
    element.append(this.#getToggleBtn());
    element.append(this.#getDeleteBtn());
    return element;
  }
}

let todos = [];
const allTodoHolder = document.getElementById("all-todos");

function renderScreen() {
  allTodoHolder.innerHTML = "";
  for (const [i, item] of todos.entries()) {
    allTodoHolder.appendChild(item.createElement(i + 1));
  }
}

async function getLatest() {
  try {
    const response = await fetch("/api");
    const res = await response.json();
    if (response.ok) {
      console.log("SUCCESS:", res.message);
      todos = [];
      res?.todos?.map((el) =>
        todos.push(new Item(el._id, el.title, el.status)),
      );
      renderScreen();
    } else {
      console.log("FAILURE:", res.message);
    }
    console.log(res);
  } catch (error) {
    console.error("Error fetching latest todos. ERR:", error.message || error);
  }
}

getLatest();
