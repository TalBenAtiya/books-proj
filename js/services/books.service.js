'use strict'
const PAGE_SIZE = 5

var gFilterBy = { MAXPRICE: 100, MINRATE: 0, NAME: '', }
var gPageIdx = 0

var gBooks = [
    'Lord Of The Rings',
    'Harry Potter',
    'The Kite Runner',
    'The Hunger Games',
    'Charlie and the Chocolate Factory',
    'Peter Rabbit',
    'Clifford the Big Red Dog',
    'James Bond',
    'Rich Dad, Poor Dad',
]
_createBooks()

function getBooksForDisplay() {

    var books = gBooks.filter(book =>
        book.price <= gFilterBy.MAXPRICE &&
        book.rating >= gFilterBy.MINRATE &&
        book.title.toUpperCase().includes(gFilterBy.NAME.toUpperCase())
    )

    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)

    return books
}

function _createBook(title, price) {
    const book = {
        id: makeId(),
        title: title,
        price: price,
        description: makeLorem(120),
        rating: 0,
    }
    return book
}

function _createBooks() {
    var books = loadFromStorage('booksDB')
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < gBooks.length; i++) {
            var title = gBooks[i]
            var price = (getRandomInt(10, 100) + Math.random()).toFixed(2)
            books.push(_createBook(title, price))
        }
    }
    gBooks = books
    console.log(gBooks);
    _saveBooksToStorage()
}

function updateBook(bookId, price) {
    if (isNaN(price)) return alert('Price input must be numeric value')
    if (price > 100 || price < 10) return alert('Price must be between 10 to 100')

    var bookIdx = getBookIdx(bookId)
    gBooks[bookIdx].price = price
    _saveBooksToStorage()
    return gBooks[bookIdx]

}

function addBook(title, price) {
    if (title === '') return alert('Title cannot be empty')
    if (isNaN(price)) return alert('Price input must be numeric value')
    if (price > 100 || price < 10) return alert('Price must be between 10 to 100')

    const newBook = _createBook(title, price)
    gBooks.unshift(newBook)
    _saveBooksToStorage()
}

function removeBook(bookId) {
    var bookIdx = getBookIdx(bookId)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function filterBy(filterObj) {
    if (filterObj.MAXPRICE !== undefined) gFilterBy.MAXPRICE = filterObj.MAXPRICE
    if (filterObj.MINRATE !== undefined) gFilterBy.MINRATE = filterObj.MINRATE
    if (filterObj.NAME !== undefined) gFilterBy.NAME = filterObj.NAME
}

function sortBy(sortOpt) {
    if (sortOpt === 'NAME') gBooks.sort((booksA, booksB) => booksA.title.toUpperCase() > booksB.title.toUpperCase() ? 1 : -1)
    if (sortOpt === 'PRICE') gBooks.sort((bookA, bookB) => bookA.price - bookB.price)
    if (sortOpt === 'RATING') gBooks.sort((bookA, bookB) => bookA.rating - bookB.rating)
}

function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length - PAGE_SIZE) disablePageBtn(gPageIdx)
}

function prevPage() {
    gPageIdx--
    if (gPageIdx * PAGE_SIZE <= 0) disablePageBtn(gPageIdx)
     
}

function addRating(bookId) {
    var bookIdx = getBookIdx(bookId)
    if (gBooks[bookIdx].rating === 10) return gBooks[bookIdx].rating
    gBooks[bookIdx].rating++
    _saveBooksToStorage()
    return gBooks[bookIdx].rating
}

function decreaseRating(bookId) {
    var bookIdx = getBookIdx(bookId)
    if (gBooks[bookIdx].rating <= 0) return gBooks[bookIdx].rating
    gBooks[bookIdx].rating--
    _saveBooksToStorage()
    return gBooks[bookIdx].rating

}

function readBook(bookId) {
    var bookIdx = getBookIdx(bookId)
    return gBooks[bookIdx].description
}

function getBookIdx(bookId) {
    var bookIdx = gBooks.findIndex(book => book.id === bookId)
    return bookIdx
}

function _saveBooksToStorage() {
    return saveToStorage('booksDB', gBooks)
}

function getSetFilter() {
    return gFilterBy
}