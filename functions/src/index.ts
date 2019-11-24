import * as functions from 'firebase-functions';
import firebase from 'firebase-admin';
import engines from 'consolidate';
import express from 'express';
import NoteService from './services/NoteService';
import cors from 'cors';

/** Firestore config. */
const firebaseApp = firebase.initializeApp();
const db = firebaseApp.firestore();

/** Services */
/** Note: Since the services are local, we can access them without a request for the static site. */
/** They're all being exposed via cloud functions as well though with REST methods. */
const noteService = new NoteService(db);

/** Express webapp config. */
const _app = express();
_app.engine('hbs', engines.handlebars)
_app.set('views', './views');
_app.set('view engine', 'hbs');

/** Default View */
_app.get('/', (request, response) => {
    noteService.fetchNotes(9).then((notes) => {
        response.render('index', { notes });
    }).catch((err) => {
        console.log(err);
    });
});

/** Express for services routing. */
const _api = express();
_api.use(cors({ origin: true }));
_api.use('/notes', noteService.router);


export const app = functions.https.onRequest(_app)
export const api = functions.https.onRequest(_api);