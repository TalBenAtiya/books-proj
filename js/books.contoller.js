'use strict'

function onInit() {
    renderFilterByQueryStringParams()
    loadFromStorage('booksDB')
    renderBooksTable()

}

function renderBooksTable() {
    var books = getBooksForDisplay()
    const strsHTML = books.map(book =>
        `<tr>
            <td class="book-id">${book.id}</td>
            <td class="title">${book.title}</td>
            <td class="book-rate">${book.rating}</td>
            <td class="book-price">${book.price}$</td>
            <td><button class="read-btn" onclick="onReadBook('${book.id}')">Read</button></td>
            <td><button class="update-btn" onclick="onUpdateBook('${book.id}')">Update</button></td>
            <td><button class="remove-btn" onclick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>`).join('')

    document.querySelector('.books-table').innerHTML = strsHTML
}

function onReadBook(bookId) {
    const txt = readBook(bookId)
    document.querySelector('.modal p').innerText = txt
    document.querySelector('.modal').style.left = '50%'
    var elRating = document.querySelector('.rating')

    var bookIdx = getBookIdx(bookId)

    const strHTML =
   `<h3>${gBooks[bookIdx].title}</h3>
   <button onclick="onCloseModal()" class="back">Back</button>
   <button onclick="onDecreaseRating('${bookId}')" class="minus">-</button>
   <div class="rating-num">${gBooks[bookIdx].rating}</div>
   <button onclick="onAddRating('${bookId}')" class="plus">+</button>`
    elRating.innerHTML = strHTML
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooksTable()
}

function onAddBook() {
    const title = prompt('Book title:')
    const price = prompt('Book price:')
    addBook(title, price)
    renderBooksTable()

}

function onCloseModal() {
    document.querySelector('.modal').style.left = '-500px'
}

function onUpdateBook(bookId) {
    const price = prompt('New Price:')
    updateBook(bookId, price)
    renderBooksTable()
}

function onAddRating(bookId) {
    var rating = addRating(bookId)
    document.querySelector('.rating-num').innerText = rating
    renderBooksTable()
}

function onDecreaseRating(bookId) {
    var rating = decreaseRating(bookId)
    document.querySelector('.rating-num').innerText = rating
    renderBooksTable()
}

function onSortBy(sortOpt) {
    sortBy(sortOpt)
    renderBooksTable()
}

function onFilterBy(filterObj){
   filterBy(filterObj)
   
   const filterSet = getSetFilter()
   
   const queryStringParams = `?MAXPRICE=${filterSet.MAXPRICE}&MINRATE=${filterSet.MINRATE}&NAME=${filterSet.NAME}`
   const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
   window.history.pushState({ path: newUrl }, '', newUrl)
   renderBooksTable()
}

function onNextPage(){
    nextPage()
    renderBooksTable()

    const elPrevBtn = document.querySelector('.prev-page')
    elPrevBtn.removeAttribute('disabled')
}

function onPrevPage(){
    prevPage()
    renderBooksTable()

    const elNextBtn = document.querySelector('.next-page')
    elNextBtn.removeAttribute('disabled')
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterSet = {
        MAXPRICE: +queryStringParams.get('MAXPRICE') || 100,
        MINRATE: +queryStringParams.get('MINRATE') || 0,
        NAME: queryStringParams.get('NAME')|| '',
    }
    // if (!filterSet. MAXPRICE)
    
    document.querySelector('.price-range').value = filterSet.MAXPRICE
    document.querySelector('.rate-range').value = filterSet.MINRATE
    document.querySelector('.search-box').value = filterSet.NAME
    onFilterBy(filterSet)
}

function disablePageBtn(pageIdx){
    console.log(pageIdx);
    if (pageIdx <= 0){
        const elPrevBtn = document.querySelector('.prev-page')
        elPrevBtn.setAttribute('disabled', '')
    }
    
    if (pageIdx > 0){
        const elNextBtn = document.querySelector('.next-page')
        elNextBtn.setAttribute('disabled', '')
    }
}
