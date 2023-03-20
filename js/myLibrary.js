const myLibrary = [];
const bookshelfReference = []; 

const bookshelf = document.querySelector('#bookshelf');

const formToggle = document.querySelector('#form-toggle');
const bookForm = document.querySelector('#book-form');
const bookAuthor = document.querySelector('#book-author');
const bookTitle = document.querySelector('#book-title');
const bookPages = document.querySelector('#book-pages');
const bookRead = document.querySelector('#book-read');
// const bookSubmit = document.querySelector('#book-submit');

class Book {
  
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
  }

}

function toggleRead(e) {
  const index = e.target.parentElement.getAttribute('data-shelf-number');
  myLibrary[index].read = !myLibrary[index].read;
  bookshelfReference[index].setAttribute('data-read', myLibrary[index].read);
}

function removeBookFromLibrary(e) {
  const index = e.target.parentElement.getAttribute('data-shelf-number');
  myLibrary.splice(index, 1);
  fillBookshelf();
}

function addBookCard() {
  const bookDiv = document.createElement('div');
  const bookInfo = document.createElement('p');
  const bookReadButton = document.createElement('button');
  const bookRemoveButton = document.createElement('button');

  bookDiv.classList.add('book');

  bookInfo.classList.add('book-info');

  bookReadButton.classList.add('book-read-button');
  bookReadButton.addEventListener('click', toggleRead);
  bookReadButton.textContent = 'Read';

  bookRemoveButton.classList.add('book-remove-button');
  bookRemoveButton.addEventListener('click', removeBookFromLibrary);
  bookRemoveButton.textContent = 'Remove';

  bookDiv.appendChild(bookInfo);
  bookDiv.appendChild(bookReadButton);
  bookDiv.appendChild(bookRemoveButton);
  bookshelf.appendChild(bookDiv);

  bookshelfReference.push(bookDiv);
  return bookDiv;
}

function fillBookshelf() {
  const libLen = myLibrary.length;

  // ensure correct number of book cards
  let bsrLen = bookshelfReference.length;
  if (libLen > bsrLen) {
    // add book cards until equal
    for (let i = bsrLen; i < libLen; i += 1) {
      const book = addBookCard();
      book.setAttribute('data-shelf-number', i);
      book.setAttribute('data-read', myLibrary[i].read);
    }
  }

  // get new number of book card divs, it stays the same if already had too many
  bsrLen = bookshelfReference.length;
  // update book cards, apply show to all to libLen, then hide for rest of bsrLen
  for (let i = 0; i < bsrLen; i += 1) {
    if (i < libLen) {
      // if in libLen, update and show
      bookshelfReference[i].querySelector('.book-info').textContent = myLibrary[i].info();
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
  // validate if all good
  
  // turn into book object and add to library, then clear form
  myLibrary.push(new Book(bookTitle.value, bookAuthor.value, bookPages.value, Boolean(bookRead.value)));
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookRead.value = "";

  fillBookshelf();
}

bookForm.addEventListener("submit", formSubmit);

// testing data

myLibrary.push(new Book('The Way of Kings', 'Brandon Sanderson', 1252, true));
myLibrary.push(new Book('Words of Radiance', 'Brandon Sanderson', 1303, true));
myLibrary.push(new Book('Oathbringer', 'Brandon Sanderson', 1306, false));
myLibrary.push(new Book('Rhythm of War', 'Brandon Sanderson', 1270, false));

fillBookshelf();
fillBookshelf();