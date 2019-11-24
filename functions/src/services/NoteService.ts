import express from 'express';
import * as admin from 'firebase-admin';

export default class NoteService {

    public router = express.Router();

    constructor(
        private db: admin.firestore.Firestore
    ) {
        this.router.get('/', this.getNotes);
    }

    /** Public routes. */
    public getNotes = (req: express.Request, res: express.Response) => {
        const limit: number = req.query.limit <= 10 ? +req.params.limit : 10;
        this.fetchNotes(limit)
            .then((notes: any[]) => res.send(notes))
            .catch((err) => console.log(err));
    }

    /** Common Service Data Methods. */
    public fetchNotes = (limit: number): Promise<any[]> => {
        return this.db.collection('notes').get().then((snapshot) => {
            const notes: any[] = [];
            snapshot.forEach((doc) => {
                notes.push(doc.data());
            });
            return notes;
        });
    };

}