let myLibrary = [];

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
    const container = document.querySelector('.books');
    myLibrary.forEach((book) => {
        const x = document.createElement('div');
        x.classList.add('book');
        x.innerText = book.info();
        container.appendChild(x);
    });
}

const b = new Book('a', 'b', 'c');

const c = new Book('a', 'b', 'c');
const d = new Book('a', 'b', 'c');

addBookToLibrary(b);
displayLibrary();
