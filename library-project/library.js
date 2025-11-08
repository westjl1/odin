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

let myLibrary = [];

function addBook(title, writer, pages, read) {
  myLibrary.push(new Book(title, writer, pages, read));
}

addBook("The Hobbit", "J.R.R. Tolkien", 295, true);
addBook("The Stand", "Stephen Kink", 785, false);
addBook("IT", "Stephen Kink", 485, true);

console.log(myLibrary);

//theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);

// console.log(Object.getPrototypeOf(theHobbit));
// console.log(theHobbit.__proto__);
// console.log(theHobbit.__proto__.__proto__);

// console.log(theHobbit instanceof Book);
// console.log(theHobbit instanceof Object);
// console.log(theHobbit instanceof Array);

// console.log(theHobbit.info());
