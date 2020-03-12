const admin = require('firebase-admin');
const contactRoutes = {};

const serviceAccount = require(process.env.FIREBASE_TOKEN);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DB_URL
});

const db = admin.database();

contactRoutes.renderIndex = (req, res) => {
    db.ref('contacts').once('value', (snapshot) => {
        const contacts = snapshot.val();
        res.render('index', { contacts });
    });
}

contactRoutes.createContact = (req, res) => {
    const { firstname, lastname, email, phone } = req.body;
    console.log(firstname, lastname, email, phone);
    const newContact = {
        firstname,
        lastname,
        email,
        phone
    }
    db.ref('contacts').push(newContact);
    res.redirect('/');
}

contactRoutes.deleteContact = (req, res) => {
    db.ref('contacts/' + req.params.id).remove();
    res.redirect('/');
}

module.exports = contactRoutes;