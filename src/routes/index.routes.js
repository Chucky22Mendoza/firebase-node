const { Router } = require('express');
const router = Router();
const { renderIndex, createContact, deleteContact } = require('../controllers/index.controller');

router.get('/', renderIndex);

router.post('/new-contact', createContact);

router.get('/delete-contact/:id', deleteContact);


module.exports = router;