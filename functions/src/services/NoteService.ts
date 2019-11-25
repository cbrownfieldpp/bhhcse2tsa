import express from 'express';
import * as admin from 'firebase-admin';
import moment from 'moment';

export default class NoteService {

    public router = express.Router();

    constructor(
        private db: admin.firestore.Firestore
    ) {
        this.router.get('/', this.getNotes);
        this.router.get('/:id', this.getNote);
        this.router.post('/', this.postNote);
    }

    /** PUBLIC ROUTES */
    /** GET api/notes/:id */
    public getNote = (req: express.Request, res: express.Response) => {
        this.db.collection('notes').doc(req.params.id).get().then((document) => {
            res.send(document.data());
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
        this.db.collection('notes').add(record).then(function(docRef) {
            record.id = docRef.id;
            res.status(201);
            res.send(record);
        }).catch(function(error) {
            res.status(500);
            res.send({ error: 'failed to add document' });
            console.error("Error adding document: ", error);
        });
    }

    /** GET api/notes 
     * ?limit={max:10}
     * */
    public getNotes = (req: express.Request, res: express.Response) => {
        const limit: number = req.query.limit <= 10 ? +req.params.limit : 10;
        this.fetchNotes(limit)
            .then((notes: any[]) => res.send(notes))
            .catch((err) => console.log(err));
    }

    /** COMMON FUNCTIONAL METHODS */

    /** Fetch the most recent notes. */
    public fetchNotes = (limit: number): Promise<any[]> => {
        return this.db.collection('notes').orderBy('created', 'desc').get().then((snapshot) => {
            const notes: any[] = [];
            snapshot.forEach((doc) => {
                notes.push(doc.data());
            });
            return notes;
        });
    };

}