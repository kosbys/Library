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

function cardTitle(name) {
    title = document.createElement('div');
    title.classList.add('card-title');
    title.innerText = name;

    return title;
}

function cardAuthor(name) {
    author = document.createElement('div');
    author.classList.add('card-author');
    author.innerText = name;

    return author;
}

function cardPages(num) {
    pages = {
        count: document.createElement('div'),
        pagesSpan: document.createElement('span'),
    };

    pages.count.classList.add('card-pages');
    pages.pagesSpan.innerText = num;
    pages.count.appendChild(pages.pagesSpan);
    pages.count.appendChild(document.createTextNode(' Pages'));

    return pages.count;
}

function cardRead(bool) {
    read = {
        div: document.createElement('div'),
        toggle: document.createElement('a'),
    };
    read.div.classList.add('card-read');
    read.toggle.addEventListener('click', () => {
        toggleRead(read.toggle);
    });
    read.div.appendChild(read.toggle);

    if (bool) {
        initializeRead(read.toggle, true);
    } else {
        initializeRead(read.toggle, false);
    }

    return read.div;
}

function cardDelete(book) {
    buttonDiv = document.createElement('div');
    buttonDiv.classList.add('delete');

    button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('delete-button');
    button.addEventListener('click', () => {
        deleteBookFromLibrary(book);
    });

    button.innerText = 'DELETE';
    buttonDiv.appendChild(button);

    return buttonDiv;
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? true : false;
}

function BookCard(book) {
    this.title = cardTitle(book.title);
    this.author = cardAuthor(book.author);
    this.pages = cardPages(book.pages);
    this.read = cardRead(book.read);
    this.delete = cardDelete(this);
    this.index = book.title.replace(/\s/g, '');
    this.titleSimple = book.title;
}

BookCard.prototype.combine = function () {
    const newBook = document.createElement('div');
    newBook.classList.add('book-card');
    newBook.classList.add(this.index);

    for (const value in this) {
        if (
            Object.hasOwnProperty.call(this, value) &&
            !(value == 'index' || value == 'titleSimple')
        ) {
            const element = this[value];
            newBook.appendChild(element);
        }
    }

    return newBook;
};

function addBookEvent() {
    let bookTitles = myLibrary.map((book) => {
        return book.titleSimple;
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
    newBook = new BookCard(book);

    newCard = newBook.combine();

    myLibrary.push(newBook);

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
