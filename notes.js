const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added'))
    } else {
        console.log(chalk.bgRed('Note title taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    const keepNotes = notes.filter((note) => note.title !== title)

    if(notes.length === keepNotes.length) {
        console.log(chalk.bgRed('No note found'))
    } else {
        saveNotes(keepNotes)
        console.log(chalk.bgGreen('Note Removed'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()

    const match = notes.find((note) => note.title === title)

    if(match) {
        console.log(chalk.bgGreen(match.title))
        console.log(match.body)
    } else {
        console.log(chalk.bgRed('No note found?'))
    }

}

const listNotes = () => {
    console.log(chalk.bgGreen('Your Notes'))
    const notes = loadNotes()

    notes.forEach(element => {
        console.log(chalk.green(element.title))
    });
}

const saveNotes = (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes))

const loadNotes = () => {
    try {
        const dataJSON = fs.readFileSync('notes.json').toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}