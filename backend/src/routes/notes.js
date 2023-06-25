const {Router} = require('express');
const router = Router();
const {getNotes, createNotes, getNote, deleteNotes, updateNotes} = require('../controllers/notes.controllers');


router.route('/')
        .get(getNotes)
        .post(createNotes)

router.route('/:id')
        .get(getNote)
        .put(updateNotes)
        .delete(deleteNotes)     
        
        
module.exports = router;

