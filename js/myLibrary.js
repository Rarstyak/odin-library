const myLibrary = [];

const bookshelf = document.querySelector('div#bookshelf');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}

Book.prototype.info = function info() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
};

Book.prototype.read = function read() {
  this.read = true;
};

Book.prototype.unread = function unread() {
  this.read = false;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  return myLibrary.length - 1;
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  return myLibrary.length - 1;
}

const oathbringer = new Book('Oathbringer', 'Brandon Sanderson', 1306, false);
addBookToLibrary(oathbringer);
console.log(myLibrary[0].info());

function fillBookshelf() {
  const len = myLibrary.length;
  for (let i = 0; i < len; i += 1) {
    const bookDiv = document.createElement('div');
    const bookReadButton = document.createElement('button');
    const bookRemoveButton = document.createElement('button');

    bookDiv.textContent = myLibrary[i].info();
    bookDiv.setAttribute('data-index', i);

    bookDiv.appendChild(bookReadButton);
    bookDiv.appendChild(bookRemoveButton);
    bookshelf.appendChild(bookDiv);
  }
}

fillBookshelf();