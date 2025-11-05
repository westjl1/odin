function Book(title, writer, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.writer = writer;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${writer}, ${pages} pages, ${
      read ? "Read" : "Not read"
    }`;
  };
}

theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);

// console.log(Object.getPrototypeOf(theHobbit));
// console.log(theHobbit.__proto__);
// console.log(theHobbit.__proto__.__proto__);

// console.log(theHobbit instanceof Book);
// console.log(theHobbit instanceof Object);
// console.log(theHobbit instanceof Array);

// console.log(theHobbit.info());

let head = {
  glasses: 1,
};

let table = {
  pen: 3,
  __proto__: head,
};

let bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table,
};

let pockets = {
  money: 2000,
  __proto__: bed,
};

// console.log(pockets.glasses);
// console.log(head.glasses);

function User(name) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.name = name;
}
User.prototype = {}; // (*)

let user = new User("John");
let user2 = new user.constructor("Pete");

console.log(typeof user2);
console.log(user2.name);
