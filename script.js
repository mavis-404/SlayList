window.addEventListener("DOMContentLoaded", () => {
  const homeSection = document.getElementById("home");
  const todoSection = document.getElementById("todo");
  const shelfSection = document.getElementById("shelf");

  const openTodoBtn = document.getElementById("openTodo");
  const openShelfBtn = document.getElementById("openShelf");

  const backFromTodoBtn = document.getElementById("backFromTodo");
  const backFromShelfBtn = document.getElementById("backFromShelf");
  //home to todo list
  openTodoBtn.addEventListener("click", function () {
    homeSection.style.display = "none";
    todoSection.style.display = "block";
  });
  //home to shelf
  openShelfBtn.addEventListener("click", function () {
    homeSection.style.display = "none";
    shelfSection.style.display = "block";
  });
  backFromTodoBtn.addEventListener("click", function () {
    todoSection.style.display = "none";
    homeSection.style.display = "block";
  });
  backFromShelfBtn.addEventListener("click", function () {
    shelfSection.style.display = "none";
    homeSection.style.display = "block";
  });
  const taskList = document.getElementById("taskList");
  const newTaskInput = document.getElementById("newTaskInput");
  const addTaskBtn = document.getElementById("addTask");
  const timeInput = document.getElementById("timeInput");

  // Handle Add Button
  addTaskBtn.addEventListener("click", () => {
    const taskText = newTaskInput.value.trim();
    const taskTime = timeInput.value.trim();

    if (taskText !== "" && taskTime !== "") {
      createTask(taskText, taskTime);
      newTaskInput.value = "";
      timeInput.value = "";
    } else {
      alert("pls fill time n task");
    }
  });

  // Function to create the task item
  function createTask(taskText, taskTime) {
    const li = document.createElement("li");
    li.innerHTML = `
    <input type="checkbox" class="task-check" />
    <span class="task-text">${taskText}</span>
    <span class="task-time"> at ${taskTime}</span>
    <button class="edit">✏️</button>
    <button class="delete">❌</button>`;
    taskList.appendChild(li);
    addTaskEvents(li);
  }

  // Add events to checkbox, delete, and edit
  function addTaskEvents(li) {
    const checkbox = li.querySelector(".task-check");
    const textSpan = li.querySelector(".task-text");
    const deleteBtn = li.querySelector(".delete");
    const editBtn = li.querySelector(".edit");

    // ✅ Mark task done
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        textSpan.style.textDecoration = "line-through";
        alert("Slayyy! ✅");
      } else {
        textSpan.style.textDecoration = "none";
      }
    });

    // ❌ Delete task
    deleteBtn.addEventListener("click", () => {
      li.remove();
    });

    // ✏️ Edit task
    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit your task:", textSpan.textContent);
      if (newText !== null && newText.trim() !== "") {
        textSpan.textContent = newText.trim();
      }
    });
  }

  // Books with 'file' property pointing to your text files inside /books folder

  const books = [
    {
      title: "Crime and Punishment",
      genre: "classic",
      language: "english",
      file: "books/Crime and Punishment.txt",
    },
    {
      title: "The Idiot",
      genre: "classic",
      language: "english",
      file: "books/the idiot.txt",
    },
    {
      title: "Notes from Underground",
      genre: "classic",
      language: "english",
      file: "books/notes from underground.txt",
    },
    {
      title: "Frankenstein",
      genre: "classic",
      language: "english",
      file: "books/frankenstein.txt",
    },
    {
      title: "Pride and Prejudice",
      genre: "Romance",
      language: "english",
      file: "books/pride and prejudice.txt",
    },

    {
      title: "Meditations",
      genre: "self-help",
      language: "english",
      file: "books/meditations.txt",
    },
    {
      title: "the brothers karamazov",
      genre: "classic",
      language: "english",
      file: "books/the brothers karamazov.txt",
    },
  ];

  // Elements
  const categoryButtons = document.querySelectorAll(".category > button");
  const genreContainers = document.querySelectorAll(".genres");
  const bookDisplay = document.getElementById("bookDisplay");
  const reader = document.getElementById("reader");

  let selectedGenre = null;

  // Show/hide genres on category click
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const style = btn.dataset.style;
      genreContainers.forEach((div) => {
        if (div.dataset.genres === style) {
          div.style.display = div.style.display === "none" ? "block" : "none";
        } else {
          div.style.display = "none"; // Hide others
        }
      });
      // Clear books and reader when switching categories
      bookDisplay.innerHTML = "";
      reader.textContent = "Select a book to read its content here...";
    });
  });

  // When genre button clicked — show books under that genre
  document.querySelectorAll(".genres button").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedGenre = btn.dataset.genre;
      renderBooks();
    });
  });

  // Render books filtered by selectedGenre
  function renderBooks() {
    bookDisplay.innerHTML = "";
    reader.textContent = "Select a book to read its content here...";

    if (!selectedGenre) {
      bookDisplay.textContent = "Please select a genre to see books.";
      return;
    }

    const filteredBooks = books.filter((book) => book.genre === selectedGenre);

    if (filteredBooks.length === 0) {
      bookDisplay.textContent = "No books found in this genre.";
      return;
    }

    filteredBooks.forEach((book) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = book.title;
      btn.style.cursor = "pointer";

      btn.addEventListener("click", () => {
        fetch(book.file)
          .then((res) => {
            if (!res.ok) throw new Error("File not found");
            return res.text();
          })
          .then((text) => {
            reader.textContent = text;
          })
          .catch((err) => {
            reader.textContent = "Error loading book: " + err.message;
          });
      });

      li.appendChild(btn);
      bookDisplay.appendChild(li);
    });
  }
});
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((reg) => {
        console.log("Service Worker registered", reg);
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  });
}
