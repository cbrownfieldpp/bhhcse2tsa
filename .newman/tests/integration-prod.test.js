const newman = require('newman');
const dotenv = require('dotenv');

/** This is a functional file for running newman via npm scripts.
 *  It's also possible run this same function purely via CLI. See nodejs.yml 
 *  to see an example of that. 
 */

/** Read .env into dotenv. */
dotenv.config();

/** Execute newman collection runner. */
newman.run({
    collection: `https://api.getpostman.com/collections/9563315-53cd1b2f-21de-4e20-b94f-97ca0c7c1f9f?apikey=${process.env.POSTMAN_API_KEY}`,
    environment: `https://api.getpostman.com/environments/9563315-ace70801-6d11-4504-b96a-b2cfabb9abf9?apikey=${process.env.POSTMAN_API_KEY}`,
    reporters: 'cli'
}, (err) => {
    if(err) { throw err; }  
    console.log("Newman Runner Complete!");
})