const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID(); // Generate a unique ID for each book
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Prototype method to toggle the read status
Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read); // Create a new book object
    myLibrary.push(newBook); // Add the book to the library array
 // Refresh the display
    displayBooks();
}

// Function to display books on the page
function displayBooks() {
    const booksDisplay = document.getElementById('books-display'); // Use the correct container
    booksDisplay.innerHTML = ''; // Clear the container

    myLibrary.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-id', book.id);

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? 'Yes' : 'No'}</p>
            <button class="toggle-read">Toggle Read</button>
            <button class="remove-book">Remove</button>
        `;

        // Add event listener for the toggle read button
        bookCard.querySelector('.toggle-read').addEventListener('click', () => {
            book.toggleReadStatus();
            displayBooks(); // Refresh the display
        });

        // Add event listener for the remove button
        bookCard.querySelector('.remove-book').addEventListener('click', () => {
            removeBookFromLibrary(book.id);
        });

        booksDisplay.appendChild(bookCard); // Append to the correct container
    });
}

// Function to remove a book from the library
function removeBookFromLibrary(bookId) {
    const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1); // Remove the book from the array
        displayBooks(); // Refresh the display
    }
}

// Function to handle the "New Book" form submission
function handleNewBookForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);

    // Clear the form
    document.getElementById('new-book-form').reset();
}

// Add event listener to the "New Book" form
document.getElementById('new-book-form').addEventListener('submit', handleNewBookForm);
