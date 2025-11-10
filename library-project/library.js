let myLibrary = [];

const ulBookInfo = document.querySelector("#book-info");

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
    return `${title} by ${writer}, ${pages} pages, ${
      read ? "Read" : "Not read"
    }`;
  };
  this.setRead = function (value) {
    this.read = value;
  };
}

function addBook(title, writer, pages, read) {
  myLibrary.push(new Book(title, writer, pages, read));
}

addBook("The Hobbit", "J.R.R. Tolkien", 295, true);
addBook("The Stand", "Stephen King", 785, false);
addBook("IT", "Stephen King", 485, true);
addBook("The Long Walk", "Stephen King", 231, true);

console.log(myLibrary);

function listBooks() {
  if (myLibrary.length > 0) {
    myLibrary.forEach((book) => {
      const infoLi = document.createElement("li");
      infoLi.id = book.id;

      const btnDelete = document.createElement("button");
      btnDelete.type = "button";
      btnDelete.textContent = "Delete";
      btnDelete.id = book.id;

      const btnUpRead = document.createElement("button");
      btnUpRead.type = "button";
      btnUpRead.textContent = `${book.read ? "Up Not Read" : "Up Read"}`;
      btnUpRead.id = book.id;

      btnDelete.addEventListener("click", (e) => {
        console.log(e.target.id);
      });

      btnUpRead.addEventListener("click", (e) => {
        console.log(e.target.id);
      });

      infoLi.textContent = book.info() + " ";
      infoLi.appendChild(btnDelete);
      infoLi.appendChild(btnUpRead);
      ulBookInfo.appendChild(infoLi);
    });
  }
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
