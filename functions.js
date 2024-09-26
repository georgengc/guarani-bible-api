const fs = require('node:fs');

const mateo = 'versions/GPC2006/mateo.json'

let rawdata = fs.readFileSync(mateo);
let data = JSON.parse(rawdata);

function getChapters() 
{
  let chapters = []

  for (let i = 0; i < data.chapters.length; i++)
  {
    let chapter = {}
    chapter.number = i+1
    chapter.title = data.chapters[i].verses[0].title
    chapters.push(chapter)
  }

  return chapters
}

function getChapter(number)
{
  if (data.chapters[number-1])
  {
    return data.chapters[number-1]
  }
  else
  {
    return 'Chapter not found'
  }
}

function getVerse(chapter, verse)
{
  verse = data.chapters[chapter-1].verses[verse.toString()]
  if (verse)
  {
    return verse
  }
  else
  {
    return 'Verse not found'
  }
}