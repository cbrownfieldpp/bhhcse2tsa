export default class NoteService {

    constructor(
        private db: any
    ) {}

    public getNotes = () => {
        console.log(typeof(this.db));
    }

}