const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const modalAdd = $("#js-modal-add");
const modalDelete = $("#js-modal-delete");
const rootTable = $("#jsTable");
const searchInput = $("#searchInput");
const nameInput = $(".js-input-name");
const authorInput = $(".js-input-author");
const topicInput = $(".js-input-topic");
const PLAYER_STORAGE_KEY = "PLAYER_05";
let books = [
  {
    name: "Refactoring",
    author: "Martin",
    topic: "Programming",
    action: "Delete",
  },
  {
    name: "Clean Code",
    author: "Robert C. Martin",
    topic: "Programming",
    action: "Delete",
  },
  {
    name: "Design Patterns",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    topic: "Programming",
    action: "Delete",
  },
  {
    name: "Database Fundamentals",
    author: "Alice Smith",
    topic: "Database",
    action: "Delete",
  },
  {
    name: "SQL Mastery",
    author: "John Doe",
    topic: "Database",
    action: "Delete",
  },
  {
    name: "DevOps Handbook",
    author: "Gene Kim, Patrick Debois, John Willis, Jez Humble",
    topic: "DevOps",
    action: "delete",
  },
];
// config
function setConfig(books) {
  localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(books));
}
function loadConfig() {
  return JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY));
}
const loadBooks = loadConfig();
if (loadBooks) {
  books = loadBooks;
}
// render table
function renderTable(Books) {
  const htmls = Books.map((book, index) => {
    return `
      <tr data-index=${index}>
          <td>${book.name}</td>
          <td>${book.author}</td>
          <td>${book.topic}</td>
          <td id="btnDelete" onclick={showModalDelete(${index})} class="action" >
              ${book.action}
          </td>
      </tr>`;
  });
  rootTable.innerHTML = htmls.join("");
}
renderTable(books);
//Modal add
function showModalAdd() {
  modalAdd.style.display = "flex";
}
function hideModalAdd() {
  modalAdd.style.display = "none";
}
window.onclick = function (e) {
  if (e.target === modalAdd) {
    hideModalAdd();
  } else if (e.target === modalDelete) {
    hideModalDelete();
  }
};
window.addEventListener("keyup", function (event) {
  if (event.key === "Escape") {
    hideModalDelete();
  }
});
//Add book
function addBook(name, author, topic, action = "delete") {
  const newBook = {
    name,
    author,
    topic,
    action,
  };
  books.push(newBook);
  setConfig(books);
  renderTable(books);
}
//Handle add book
function clearInput() {
  nameInput.value = "";
  authorInput.value = "";
}
function handleAddBook() {
  const name = nameInput.value;
  const author = authorInput.value;
  const topic = topicInput.value;
  if (name && author && topic) {
    addBook(name, author, topic);
    hideModalAdd();
    clearInput();
  } else {
    alert("Vui lòng nhập đầy đủ");
  }
}
//Handle delete book
function handleDeleteBook(index) {
  books.splice(index, 1);
  hideModalDelete();
  setConfig(books);
  renderTable(books);
}
// Modal delete
function showModalDelete(index) {
  const name = books[index].name;
  const modalContent = `
    <div class="delete-container modal-container" >
      <div class="delete_header modal-header">
        <p class="delete_header-title">Delete book</p>
        <p class="delete_header-close" onclick={hideModalDelete()}>&times;</p>
      </div>
      <div class="delete_content">
        <p class="delete_content-text">Do you want to delete <span class="delete_content-title">${name}</span> book?</p>
      </div>
      <div class="delete_button">
        <button class="button delete_button-item js-btn-delete" onclick="{handleDeleteBook(${index})}">Delete</button>
        <button 
            class="button delete_button-item" 
            onclick={hideModalDelete()}
            > 
            Cancel
        </button>
      </div>
    </div>
    `;
  modalDelete.innerHTML = modalContent;
  modalDelete.style.display = "flex";
}
function hideModalDelete() {
  modalDelete.style.display = "none";
}
// Search by name
searchInput.addEventListener("keyup", () => {
  const name = searchInput.value;
  searchByName(name);
});
function searchByName(name) {
  const searchResult = books.filter((book) => {
    return book.name.toLowerCase().includes(name.toLowerCase());
  });
  renderTable(searchResult);
}
