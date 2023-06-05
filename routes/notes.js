const notes = require('express').Router();

const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

const fs = require('fs');

const express = require('express');

const path = require('path');

const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.json(`Error in adding note`);
    }
});

notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json').then((data) => JSON.parse(data)).then((json) => {
        const result = json.filter(note => note.note_id !== noteId);
        writeToFile('./db/db.json', result);
        res.json(`Note deleted successfully`);
    });
});

module.exports = notes;