const {Router} = require('express');
const router = Router();
const { createUsers, deleteUsers, getUsers, getUser, updateUsers} = require('../controllers/user.controllers')

router.route('/')
        .get(getUsers)
        .post(createUsers)

router.route('/:id')
        .get(getUser)
        .put(updateUsers)
        .delete(deleteUsers)        
        
        
module.exports = router;