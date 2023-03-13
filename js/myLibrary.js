const myLibrary = [];
const bookshelfReference = []; 

const bookshelf = document.querySelector('#bookshelf');

const formToggle = document.querySelector('#form-toggle');
const bookForm = document.querySelector('#book-form');
const bookAuthor = document.querySelector('#book-author');
const bookTitle = document.querySelector('#book-title');
const bookPages = document.querySelector('#book-pages');
const bookRead = document.querySelector('#book-read');
const bookSubmit = document.querySelector('#book-submit');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}

Book.prototype.info = function info() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
};

Book.prototype.isRead = function isRead() {
  return this.read;
}

Book.prototype.read = function read() {
  this.read = true;
};

Book.prototype.unread = function unread() {
  this.read = false;
};

// function toggleRead(index) {
//   return myLibrary[index].isRead() ? myLibrary[index].unread() : myLibrary[index].read();
// }

// function removeBookFromLibrary(index) {
//   myLibrary.splice(index, 1);
//   return myLibrary.length - 1;
// }

// function addBookToLibrary(book) {
//   // const bookDiv = document.createElement('div');
//   // const bookReadButton = document.createElement('button');
//   // const bookRemoveButton = document.createElement('button');

//   // bookDiv.classList.add('book');
//   // bookDiv.textContent = book.info();

//   // bookReadButton.classList.add('book-read-button');
//   // bookReadButton.addEventListener('click', toggleRead);

//   // bookRemoveButton.classList.add('book-remove-button');
//   // bookRemoveButton.addEventListener('click', removeBookFromLibrary);

//   // bookDiv.appendChild(bookReadButton);
//   // bookDiv.appendChild(bookRemoveButton);
//   // bookshelf.appendChild(bookDiv);
// }


function addBookCard() {
  const bookDiv = document.createElement('div');
  // const bookReadButton = document.createElement('button');
  // const bookRemoveButton = document.createElement('button');

  bookDiv.classList.add('book');

  // bookReadButton.classList.add('book-read-button');
  // bookReadButton.addEventListener('click', toggleRead);

  // bookRemoveButton.classList.add('book-remove-button');
  // bookRemoveButton.addEventListener('click', removeBookFromLibrary);

  // bookDiv.appendChild(bookReadButton);
  // bookDiv.appendChild(bookRemoveButton);
  bookshelf.appendChild(bookDiv);

  bookshelfReference.push(bookDiv);
}

function fillBookshelf() {
  const libLen = myLibrary.length;

  // ensure correct number of book cards
  let bsrLen = bookshelfReference.length;
  if (libLen > bsrLen) {
    // add book cards until equal
    for (let i = bsrLen; i < libLen; i += 1) {
      addBookCard();
    }
  }

  // get new number of book card divs, it stays the same if already had too many
  bsrLen = bookshelfReference.length;
  // update book cards, apply show to all to libLen, then hide for rest of bsrLen
  for (let i = 0; i < bsrLen; i += 1) {
    if (i < libLen) {
      // if in libLen, update and show
      bookshelfReference[i].textContent = myLibrary[i].info();
      bookshelfReference[i].style.display = 'block';
    } else {
      // in out of libLen, skip update and hide
      bookshelfReference[i].style.display = 'none';
    }
  }
}

function formToggleDisplay() {
  bookForm.style.display = bookForm.style.display === 'block' ? 'none' : 'block';
}

formToggle.addEventListener("click", formToggleDisplay);

function formSubmit(e) {
  e.preventDefault();
  // validate if all good, then turn into book object and add to library, then clear form
}

bookSubmit.addEventListener("click", formSubmit, false);

// testing data

myLibrary[0] = new Book('Oathbringer', 'Brandon Sanderson', 1306, false);
myLibrary[1] = new Book('Rhythm of War', 'Brandon Sanderson', 1270, false);

fillBookshelf();
fillBookshelf();