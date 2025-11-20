let myLibrary = [];

const ulBookInfo = document.querySelector("#book-info");
const dialog = document.querySelector("dialog");
const fieldSet = document.querySelector("#fldSet");
const showButton = document.querySelector("#open-dialog");
const insertBook = document.querySelector("#insertBook");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

dialog.addEventListener("close", (e) => {
  if (dialog.returnValue === "add") {
    const title = dialog.querySelector("#title").value;
    const writer = dialog.querySelector("#author").value;
    const pages = parseInt(dialog.querySelector("#pages").value);
    const read = dialog.querySelector("#read").value === "true" ? true : false;

    addBook(title, writer, pages, read);
    listBooks();
  }
});

class Book {
  constructor(title, writer, pages, read) {
    if (!new.target) {
      throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.writer = writer;
    this.pages = pages;
    this.read = read;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get writer() {
    return this._writer;
  }

  set writer(value) {
    this._writer = value;
  }

  get pages() {
    return this._pages;
  }

  set pages(value) {
    this._pages = value;
  }

  get read() {
    return this._read;
  }

  set read(value) {
    this._read = value;
  }

  info = () => {
    return `${this.title} by ${this.writer}, ${this.pages} pages, ${
      this.read ? "Read" : "Not read"
    }`;
  };
}

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
      book.read = !book.read;
    }
    return book;
  });
  listBooks();
}

listBooks();
