'use strict'

var gCurrLang = 'en'

const gTrans = {
'title':{
    en:'Books Shop',
    he:'חנות ספרים',
},
'price-range':{
    en:'Max Price',
    he:'מחיר מירבי'
},
'rate-range':{
    en:'Min Ratting',
    he:'דירוג מינימלי'
},
'new-book-btn':{
    en:'Create New Book',
    he:'הוספת ספר חדש',
},
'search-box':{
    en:'Search by book name:',
    he:'חפש לפי שם ספר:',
},
'sort-title':{
    en:'Sort',
    he:'מיין',
},
'sort-name':{
    en:'Alphabetical',
    he:'לפי א\'-ב\'',
},
'sort-price':{
    en:'Price',
    he:'מחיר',
},
'sort-rate':{
    en:'Rating',
    he:'דירוג',
},
'th-id':{
    en:'ID',
    he:'ID',
},
'th-title':{
    en:'Title',
    he:'שם הספר',
},
'th-rate':{
    en:'Rating',
    he:'דירוג',
},
'th-price':{
    en:'Price',
    he:'מחיר',
},
'th-acts':{
    en:'Actions',
    he:'פעולות',
},
'nxt-pg-btn':{
    en:'Next Page',
    he:'עמוד הבא',
},
'prv-pg-btn':{
    en:'Prev Page',
    he:'עמוד קודם',
},
'modal-rate':{
    en:'Rating',
    he:'דירוג',
},
'lang-en':{
    en:'English',
    he:'אנגלית',
},
'lang-he':{
    en:'Hebrew',
    he:'עברית',
},
'read-btn':{
    en:'Read',
    he:'קרא',
},
'update-btn':{
    en:'Update',
    he:'עדכן',
},
'remove-btn':{
    en:'Delete',
    he:'מחק',
},
'back-btn':{
    en:'Back',
    he:'חזור',
},
'new-book-title':{
    en:'Book title:',
    he:'שם הספר:',
},
'new-book-price':{
    en:'Book price:',
    he:'מחיר הספר:',
},
'new-book-input-name':{
    en:'Book title in english:',
    he:'שם הספר החדש באנגלית:',
},
'new-book-input-price':{
    en:'Book price in $:',
    he:'מחיר הספר ב$:',
},
'new-add-btn':{
    en:'Add book',
    he:'הוסף ספר',
},
'flash-msg-del':{
    en:'Book Deleted!',
    he:'הספר הוסר!',
},
'flash-msg-add':{
    en:'Book Added!',
    he:'הספר נוסף!',
},
}

function initLang(){
    gCurrLang = loadFromStorage('langDB')
    return gCurrLang
}

function setLang(lang){
    gCurrLang = lang   
}

function getTrans(transKey){
    const key = gTrans[transKey]
    if (!key) return 'UNKONWN'
    var transVal = key[gCurrLang]
    return transVal
}

function doTrans(){
   var transEls = document.querySelectorAll('[data-trans]')
   transEls.forEach(el => {
    const transKey = el.dataset.trans
    const transVal = getTrans(transKey)
    el.innerText = transVal
    if (el.placeholder !== undefined) el.placeholder = transVal
   })
   _saveLangToStorage()
}

function _saveLangToStorage() {
    return saveToStorage('langDB', gCurrLang)
}