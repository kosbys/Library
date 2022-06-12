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

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read ? true : false;
    }
}

class BookCard extends Book {
    constructor(title, author, pages, read) {
        super(title, author, pages, read);
        this.index = title.replace(/\s/g, '');
    }

    get titleDiv() {
        const div = document.createElement('div');
        div.classList.add('card-title');
        div.innerText = this.title;

        return div;
    }

    get authorDiv() {
        const div = document.createElement('div');
        div.classList.add('card-author');
        div.innerText = this.author;

        return div;
    }

    get pagesDiv() {
        const div = {
            count: document.createElement('div'),
            pagesSpan: document.createElement('span'),
        };

        div.count.classList.add('card-pages');
        div.pagesSpan.innerText = this.pages;
        div.count.appendChild(div.pagesSpan);
        div.count.appendChild(document.createTextNode(' Pages'));

        return div.count;
    }

    get readDiv() {
        const div = {
            d: document.createElement('div'),
            toggle: document.createElement('a'),
        };
        div.d.classList.add('card-read');
        div.toggle.addEventListener('click', () => {
            toggleRead(div.toggle);
        });
        div.d.appendChild(div.toggle);

        if (this.read) {
            initializeRead(div.toggle, true);
        } else {
            initializeRead(div.toggle, false);
        }

        return div.d;
    }

    get deleteDiv() {
        const div = document.createElement('div');
        div.classList.add('delete');

        let button = document.createElement('button');
        button.classList.add('btn');
        button.classList.add('delete-button');
        button.addEventListener('click', () => {
            deleteBookFromLibrary(this);
        });

        button.innerText = 'DELETE';
        div.appendChild(button);

        return div;
    }

    combine() {
        const newBook = document.createElement('div');
        newBook.classList.add('book-card');
        newBook.classList.add(this.index);

        newBook.appendChild(this.titleDiv);
        newBook.appendChild(this.authorDiv);
        newBook.appendChild(this.pagesDiv);
        newBook.appendChild(this.readDiv);
        newBook.appendChild(this.deleteDiv);

        return newBook;
    }
}

function addBookEvent() {
    let bookTitles = myLibrary.map((book) => {
        return book.titleSimple;
    });

    const newBook = new BookCard(
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
    newCard = book.combine();

    myLibrary.push(newCard);

    bookContainer.appendChild(newCard);
}

function deleteBookFromLibrary(book) {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    updateLibraryDelete(book);
}

function updateLibraryDelete(book) {
    let cardToDelete;
    for (const child of bookContainer.children) {
        if ([...child.classList].includes(book.index)) {
            cardToDelete = child;
        }
    }
    bookContainer.removeChild(cardToDelete);
}

function initializeRead(element, bool) {
    switch (bool) {
        case true:
            element.id = 'read';
            element.innerText = 'Read';
            break;

        case false:
            element.id = 'unread';
            element.innerText = 'Unread';
            break;
    }
}

function toggleRead(element) {
    switch (element.id) {
        case 'unread':
            element.id = 'read';
            element.innerText = 'Read';
            break;

        case 'read':
            element.id = 'unread';
            element.innerText = 'Unread';
            break;
    }
}

function toggleModal() {
    modal.style.display == 'none' || modal.style.display == ''
        ? (modal.style.display = 'block')
        : (modal.style.display = 'none');
    formValidator.innerText = '';
}
