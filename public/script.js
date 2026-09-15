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
    const response = await fetch("/health");
    const res = await response.json();
    if (response.ok) {
      console.log("SUCCESS:", res.message);
    } else {
      console.log("FAILURE:", res.message);
    }
  } catch (error) {
    console.error(error.message);
  }
});
