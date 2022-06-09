// TODO: FINISH FORM //

const bookContainer = document.querySelector('.books');
const modal = document.querySelector('.modal');
const newButton = document.querySelector('.new-button');
const addButton = document.querySelector('.add-button');
const form = document.querySelector('#new-book-form');
const myLibrary = [];

newButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

addButton.addEventListener('click', () => {
    console.log(form);
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? true : false;

    this.info = function () {
        return `${title} by ${author}, ${pages} pages`;
    };
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayLibrary() {
    myLibrary.forEach((book) => {
        const newBook = document.createElement('div');
        newBook.classList.add('book');
        newBook.innerText = book.info();
        bookContainer.appendChild(newBook);
    });
}

const b = new Book('a', 'b', 'c');

const c = new Book('a', 'b', 'c');
const d = new Book('a', 'b', 'c');

addBookToLibrary(b);
displayLibrary();
