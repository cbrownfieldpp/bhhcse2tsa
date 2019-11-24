import * as functions from 'firebase-functions';
import firebase from 'firebase-admin';
import engines from 'consolidate';

// tslint:disable-next-line:no-implicit-dependencies
import express from 'express';

const firebaseApp = firebase.initializeApp();

const db = firebaseApp.firestore();

function getNotes () {
    return db.collection('notes').get().then((snapshot) => {
        const notes: any[] = [];
        snapshot.forEach((doc) => {
            notes.push(doc.data());
        });
        return notes;
    });
};

/** Since the app will server dynamic "reasons to work at BHHC", we'll create some dynamic views using handlebars. */
const app = express();
app.engine('hbs', engines.handlebars)
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (request, response) => {
    getNotes().then((notes) => {
        console.log(notes);
        response.render('index', { notes });
        // response.send("Hellow world.")
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/notes', (request, response) => {
    getNotes().then((notes) => {
        response.send(notes);
    });
});

export const webapp = functions.https.onRequest(app)
