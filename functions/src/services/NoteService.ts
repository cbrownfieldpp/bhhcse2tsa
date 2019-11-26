import { isApiAuthenticated } from './../middleware/AuthenticationMiddleware';
import express from 'express';
import * as admin from 'firebase-admin';
import moment from 'moment';

/**Interviewer Note: With Firebase/Firestore, datastore routes are exposed, but defining a limited subset via 
 * cloud-functions comes with the benefit that I can block all read/write access to my datastore enpoints
 * and leave it open only to my cloud-functions project. This allows me to expose only the methods I want 
 * as well as controlling how the data gets pulled with validatable queries. 
 * 
 * Note the use of this in the following methods where I define the GET api/notes route to have a default max limit
 * of size 10, and allow the requester to define this limit in the query string. 
 */
export default class NoteService {

    public router = express.Router();

    constructor(
        private db: admin.firestore.Firestore
    ) {
        /** GET api/notes */
        this.router.get('/', this.getNotes);

        /** GET api/notes/:id */
        this.router.get('/:id', this.getNote);

        /** POST api/notes */
        this.router.post('/', isApiAuthenticated, this.postNote);
    }

    /** PUBLIC ROUTES */
    /** GET api/notes/:id */
    public getNote = (req: express.Request, res: express.Response) => {
        this.db.collection('notes').doc(req.params.id).get().then((document) => {
            res.send(document.data());
        }).catch((err) => {
            res.status(500);
            res.send({ error: "error fetching note " + req.params.id });
            console.log("NoteService:getNote():", err);
        });
    }

    /** POST api/notes */
    public postNote = (req: express.Request, res: express.Response) => {
        /** Insert validation. */
        const record: any = {
            created: moment(req.body.created).toDate(),
            msg: req.body.msg,
            title: req.body.title
        };
        this.db.collection('notes').add(record).then(function (docRef) {
            record.id = docRef.id;
            res.status(201);
            res.send(record);
        }).catch(function (error) {
            res.status(500);
            res.send({ error: 'failed to add document' });
            console.error("NoteService:postNote():", error);
        });
    }

    /** GET api/notes 
     * ?limit={max:10}
     * */
    public getNotes = (req: express.Request, res: express.Response) => {
        const limit: number = req.query.limit <= 10 ? +req.query.limit : 10;
        this.fetchNotes(limit).then((notes: any[]) => {
            res.send(notes)
        }).catch((err) => {
            res.status(500);
            res.send({error: 'failed to fetch documents'})
            console.error("NoteService:getNotes():", err);
        });
    }

    /** END PUBLIC ROUTES */

    /** COMMON FUNCTIONAL METHODS */

    /** Fetch the most recent notes. */
    public fetchNotes = (limit: number): Promise < any[] > => {
        return this.db.collection('notes').orderBy('created', 'desc').limit(limit).get().then((snapshot) => {
            const notes: any[] = [];
            snapshot.forEach((doc) => {
                notes.push(doc.data());
            });
            return notes;
        });
    };

    /** END COMMON FUNCTIONAL METHODS */

}