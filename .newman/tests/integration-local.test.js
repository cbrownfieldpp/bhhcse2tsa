const newman = require('newman');
const dotenv = require('dotenv');
dotenv.config();
newman.run({
    collection: `https://api.getpostman.com/collections/9563315-53cd1b2f-21de-4e20-b94f-97ca0c7c1f9f?apikey=${process.env.POSTMAN_API_KEY}`,
    environment: `https://api.getpostman.com/environments/9563315-695708fa-4101-4ac3-bda2-b85cf316d1c1?apikey=${process.env.POSTMAN_API_KEY}`,
    reporters: 'cli'
}, (err) => {
    if(err) { throw err; }  
    console.log("Newman Runner Complete!");
})