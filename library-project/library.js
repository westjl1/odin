let myLibrary = [];

const ulBookInfo = document.querySelector("#book-info");
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#open-dialog");
const closeButton = document.querySelector("#close-dialog");
const insertBook = document.querySelector("#insert-book");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

insertBook.addEventListener("click", (e) => {
  e.preventDefault();
});

function Book(title, writer, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.writer = writer;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.writer}, ${this.pages} pages, ${
      this.read ? "Read" : "Not read"
    }`;
  };
}

Book.prototype.setRead = function (value) {
  this.read = value;
};

function addBook(title, writer, pages, read) {
  myLibrary.push(new Book(title, writer, pages, read));
}

addBook("The Hobbit", "J.R.R. Tolkien", 295, true);
addBook("The Stand", "Stephen King", 785, false);
addBook("IT", "Stephen King", 485, true);
addBook("The Long Walk", "Stephen King", 231, true);

function listBooks() {
  ulBookInfo.innerHTML = "";

  myLibrary.forEach((book) => {
    const infoLi = document.createElement("li");
    infoLi.id = "infoLi_" + book.id;

    const btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.textContent = "Delete";
    btnDelete.id = "btnDelete_" + book.id;

    const btnUpRead = document.createElement("button");
    btnUpRead.type = "button";
    btnUpRead.textContent = `${book.read ? "Up Not Read" : "Up Read"}`;
    btnUpRead.id = "btnUpRead_" + book.id;

    btnDelete.addEventListener("click", (e) => {
      removeBook(e.target.id.slice(e.target.id.indexOf("_") + 1));
    });

    btnUpRead.addEventListener("click", (e) => {
      updateRead(e.target.id.slice(e.target.id.indexOf("_") + 1));
    });

    infoLi.textContent = book.info() + " ";
    infoLi.appendChild(btnDelete);
    infoLi.appendChild(btnUpRead);
    ulBookInfo.appendChild(infoLi);
  });
}

function removeBook(bookId) {
  myLibrary = myLibrary.filter((book) => book.id !== bookId);
  listBooks();
}

function updateRead(bookId) {
  // myLibrary.forEach((book) => {
  //   if (book.id === bookId) {
  //     book.setRead(!book.read);
  //   }
  // });
  myLibrary = myLibrary.map((book) => {
    if (book.id === bookId) {
      book.setRead(!book.read);
    }
    return book;
  });
  listBooks();
}

listBooks();

//theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);

// console.log(Object.getPrototypeOf(theHobbit));
// console.log(theHobbit.__proto__);
// console.log(theHobbit.__proto__.__proto__);

// console.log(theHobbit instanceof Book);
// console.log(theHobbit instanceof Object);
// console.log(theHobbit instanceof Array);

// console.log(theHobbit.info());
