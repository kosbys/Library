// TODO: MAKE BOOK CARDS //

const bookContainer = document.querySelector('.books');
const modal = document.querySelector('.modal');
const newButton = document.querySelector('.new-button');
const addButton = document.querySelector('.add-button');
const formValidator = document.querySelector('.alert');
const form = document.forms['form'];
const myLibrary = [];

newButton.addEventListener('click', toggleModal);

addButton.addEventListener('click', addBookEvent);

let backgroundClickExitModal = (window.onclick = function (event) {
    if (event.target == modal) {
        toggleModal();
    }
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? true : false;
}

function bookInfo(book) {
    return `${book.title} by ${book.author}, ${book.pages} pages \t read? ${book.read}`;
}

function addBookEvent() {
    let bookTitles = myLibrary.map((book) => {
        return book.title;
    });

    const newBook = new Book(
        document.form.title.value,
        document.form.author.value,
        document.form.pages.value,
        document.form.read.checked
    );

    for (const value in newBook) {
        const element = newBook[value];
        if (element.length === 0) {
            formValidator.innerText = 'Please do not leave any empty fields';
            return;
        }
    }
    if (bookTitles.includes(document.form.title.value)) {
        formValidator.innerText = 'This book is already in the library';
        return;
    }

    addBookToLibrary(newBook);
    toggleModal();
    resetForm();
}

function resetForm() {
    document.getElementById('new-book-form').reset();
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    updateLibrary(book);
}

function updateLibrary(book) {
    const newBook = document.createElement('div');
    newBook.classList.add('book');
    newBook.classList.add(book.title);
    newBook.innerText = bookInfo(book);

    bookContainer.appendChild(newBook);
}

function toggleModal() {
    modal.style.display == 'none' || modal.style.display == ''
        ? (modal.style.display = 'block')
        : (modal.style.display = 'none');
    formValidator.innerText = '';
}
