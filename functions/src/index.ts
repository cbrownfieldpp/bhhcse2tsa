import * as functions from 'firebase-functions';
import firebase from 'firebase-admin';
import engines from 'consolidate';
import express from 'express';
import NoteService from './services/NoteService';
import cors from 'cors';
import moment from 'moment';

/** Firebase Configuration */
const firebaseApp = firebase.initializeApp();
const db = firebaseApp.firestore();

/** Services */
const noteService = new NoteService(db);

/** Express Configuration - WebApp */
const _app = express();
_app.use(cors({ origin: true }));
_app.engine('hbs', engines.handlebars)
_app.set('views', './views');
_app.set('view engine', 'hbs');

/** Default View */
_app.get('/', (request, response) => {
    /**Interviewer Note: I need to derive a human-readable time field 'timeSince', I didn't 
     * want * to include this in the default API Service GET method for Notes so I just derived 
     * it on the fly here exclusively for the main view.
     */
    noteService.fetchNotes(9).then((notes) => {
        const formattedNotes = notes.map((note) => {
            if (note.created) {
                note.timeSince = moment(note.created.toDate()).fromNow()
            }
            return note;
        });
        console.log("Formatted Notes: ", formattedNotes);
        response.render('index', {
            formattedNotes
        });
    }).catch((err) => {
        console.log(err);
    });
});

/** Express Configuration - API Services */
const _api = express();
_api.use(cors({ origin: true }));
_api.use('/notes', noteService.router);

/** Exposed Endpoints */
export const app = functions.https.onRequest(_app) /** {url}/app -> rewrites / */
export const api = functions.https.onRequest(_api); /** {cf-url}/api/* */
