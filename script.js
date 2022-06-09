// TODO: MAKE BOOK CARDS //

const bookContainer = document.querySelector('.books');
const modal = document.querySelector('.modal');
const newButton = document.querySelector('.new-button');
const addButton = document.querySelector('.add-button');
const formValidator = document.querySelector('.alert');
const form = document.forms['form'];
const myLibrary = [];

newButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

addButton.addEventListener('click', () => {
    formValidator.innerText = '';

    const newBook = new Book(
        document.form.title.value,
        document.form.author.value,
        document.form.pages.value,
        document.form.read.checked
    );

    for (const val in newBook) {
        const element = newBook[val];
        if (element.length === 0) {
            formValidator.innerText = 'Please do not leave any empty fields';
            return;
        }
    }

    addBookToLibrary(newBook);
    modal.style.display = 'none';
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

function addBookToLibrary(book) {
    myLibrary.push(book);
    updateLibrary();
}

function updateLibrary() {
    bookContainer.innerHTML = '';
    myLibrary.forEach((book) => {
        const newBook = document.createElement('div');
        newBook.setAttribute('name', book.title);
        newBook.classList.add('book');
        newBook.innerText = bookInfo(book);

        bookContainer.appendChild(newBook);
    });
}
