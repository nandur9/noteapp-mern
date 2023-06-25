const { findByIdAndDelete, findByIdAndUpdate } = require('../models/noteModel');
const noteModel = require('../models/noteModel');

const notesCtrl={};     



notesCtrl.getNotes = async (req, res)=> {

    const notesDB = await noteModel.find();
    
    res.json(notesDB);
    
};



notesCtrl.createNotes = async (req, res)=> {
    const {title, content, author, state, date} = req.body;
    const newNote  = new noteModel({
        title: title,
        content: content,
        author: author,
        state: state,
        date: date

    });

    await newNote.save(); //guarda en la bbdd de mongo

    console.log(newNote);
    

    res.json({message: 'Note saved.'})
};



//With ID input:

notesCtrl.getNote = async(req, res)=> {

        const idNote = await noteModel.findById(req.params.id);
    
    res.json(idNote);
};

notesCtrl.updateNotes = async (req, res)=> {
    
    const {title, content, author, state, date} = req.body;

    await noteModel.findByIdAndUpdate(req.params.id, {
        title: title,
        content: content,
        author: author,
        state: state,
        date: date
        });
        
    res.json({message:'NOTE UPDATED'});

};

notesCtrl.deleteNotes= async (req, res) => {

    await noteModel.findByIdAndDelete(req.params.id);
    res.json({message:'NOTE DELETED'})
};


module.exports= notesCtrl;