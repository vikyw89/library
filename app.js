let myLibrary = localStorage.getItem('myLibrary') === undefined
    ? [{
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        pages: '200',
        status: 'read'
    }]
    : JSON.parse(localStorage.getItem('myLibrary'))

console.log(myLibrary)

const libraryContainer = document.querySelector('.library-container')

function Book(title, author, pages, status) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.status = status
}

function addBookToLibrary(title, author, pages, status) {
    myLibrary = myLibrary.concat(new Book(title, author, pages, status))
}

const formHandler = (e)=> {
    e.preventDefault()
    const {title, author, pages, status} = Object.fromEntries(new FormData(e.target))
    addBookToLibrary(title, author, pages, status ?? 'read')
    libraryDisplay(myLibrary)
}

const cardButtonHandler = (e) => {
    if (e.target.textContent != 'read') {
        e.target.textContent = 'read'
    } else {
        e.target.textContent = 'unread'
    }
}

const libraryDisplay = (arg)=> {
    libraryContainer.innerHTML = null
    for (let index in arg) {
        const newCard = document.createElement('div')
        newCard.classList.add('library-card')
        for (let [key, value] of Object.entries(arg[index])) {
            if (key != 'status') {
                const entry = document.createElement('div')
                entry.textContent = `${value}`
                newCard.appendChild(entry)
            } else {
                const button = document.createElement('button')
                button.textContent = `${value}`
                button.setAttribute('type', 'button')
                button.setAttribute('value', `${index}`)
                button.classList.add('status')
                button.addEventListener('click', cardButtonHandler)
                newCard.appendChild(button)
            }
        }
        const cardDeleteButton = document.createElement('button')
        cardDeleteButton.textContent = 'x'
        cardDeleteButton.setAttribute('type', 'button')
        cardDeleteButton.setAttribute('value', `${index}`)
        cardDeleteButton.classList.add('delete')
        cardDeleteButton.addEventListener('click', cardDeleteButtonHandler)
        newCard.appendChild(cardDeleteButton)
        libraryContainer.appendChild(newCard)
    }
    syncLocalStorage(myLibrary)
}

const cardDeleteButtonHandler = (e) => {
    myLibrary.splice(e.target.value, 1)
    libraryDisplay(myLibrary)
}

const searchTitleHandler = (e) => {
    const filteredLibrary = myLibrary.filter(element => element.title.toLowerCase().match(e.target.value.toLowerCase()))
    libraryDisplay(filteredLibrary)
}

const cardButton = document.querySelectorAll('.library-card > .status')
cardButton.forEach((element)=> {
    element.addEventListener('click', cardButtonHandler)
})

const cardDeleteButton = document.querySelectorAll('.library-card > .delete')
cardDeleteButton.forEach((element)=> {
    element.addEventListener('click', cardDeleteButtonHandler)
})

const form = document.querySelector('#form1')
form.addEventListener('submit', formHandler)

const searchTitle = document.querySelector('.search-title')
searchTitle.addEventListener('input', searchTitleHandler)

const syncLocalStorage = (arg) => {
    localStorage.setItem("myLibrary", JSON.stringify(arg));
}

libraryDisplay(myLibrary)