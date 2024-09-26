const fs = require('node:fs');

//const mateo = 'versions/GPC2006/mateo.json'
//const mateo = 'versions/GPC2006/marcos.json'

//let path = 'books/versions/GPC2006/'

//let rawdata = fs.readFileSync(mateo);
//let data = JSON.parse(rawdata);

const bookspath = 'books/books.json'
const versionspath = 'books/versions/GPC2006/'

function getJSON(path)
{
  let rawdata = fs.readFileSync(path)
  return JSON.parse(rawdata)
}

function getBookList()
{
  return getJSON(bookspath)
}

function getBook(book)
{
  let booklist = getBookList()
  for (let i = 0; i < booklist.length; i++)
  {
    let currentbook = getJSON(versionspath + booklist[i].name + '.json')
    if (currentbook.book == book)
    {
      return currentbook
    }
  }
}

function getBookPath(book) //too overengineered.... make it simpler
{
  let booklist = getBookList()
  for (let i = 0; i < booklist.length; i++)
  {
    let currentbookpath = versionspath + booklist[i].name + '.json'
    let currentbook = getJSON(currentbookpath)
    if (currentbook.book == book)
    {
      return currentbookpath
    }
  }
}

function getChapters(book) 
{
  let chapters = []
  let bookdata = getJSON(getBookPath(book))

  for (let i = 0; i < bookdata.chapters.length; i++)
  {
    let chapter = {}
    chapter.number = i+1
    chapter.title = bookdata.chapters[i].verses[0].title
    chapters.push(chapter)
  }

  return chapters
}

function getChapter(book, number)
{
  let bookdata = getJSON(getBookPath(book))
  if (bookdata.chapters[number-1])
  {
    return bookdata.chapters[number-1]
  }
  else
  {
    return 'Chapter not found' //not working
  }
}

function getVerse(book, chapter, verse)
{
  let bookdata = getJSON(getBookPath(book))
  for (let i = 0; i < bookdata.chapters[chapter-1].verses.length; i++)
  {
    if (bookdata.chapters[chapter-1].verses[i][verse.toString()])
    {
      verse = bookdata.chapters[chapter-1].verses[i]
    }
  }
  if (verse)
  {
    return verse
  }
  else
  {
    return 'Verse not found' //not working
  }
}