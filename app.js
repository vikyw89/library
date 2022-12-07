let myLibrary = [];

function Book(title,author,pages) {
    this.title = title,
    this.author = author,
    this.pages = pages
}

function addBookToLibrary({title, author, pages}) {
    console.log(addBookToLibrary)
    myLibrary.push(Object.create(Book(title, author, pages)))
    console.log(myLibrary)
}