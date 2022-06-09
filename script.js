// TODO: FINISH FORM //

const bookContainer = document.querySelector('.books');
const modal = document.querySelector('.modal');
const newButton = document.querySelector('.new-button');
const addButton = document.querySelector('.add-button');
const form = document.forms['form'];
const myLibrary = [];

newButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

addButton.addEventListener('click', () => {
    const newBook = new Book(
        document.form.title.value,
        document.form.author.value,
        document.form.pages.value,
        document.form.read.value
    );

    addBookToLibrary(newBook);
    modal.style.display = 'none';
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
    displayLibrary();
}

function displayLibrary() {
    myLibrary.forEach((book) => {
        const newBook = document.createElement('div');
        newBook.classList.add('book');
        newBook.innerText = book.info();
        bookContainer.appendChild(newBook);
    });
}
