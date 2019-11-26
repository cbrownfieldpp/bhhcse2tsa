const newman = require('newman');
const dotenv = require('dotenv');
dotenv.config();
newman.run({
    collection: `https://api.getpostman.com/collections/9563315-53cd1b2f-21de-4e20-b94f-97ca0c7c1f9f?apikey=${process.env.POSTMAN_API_KEY}`,
    environment: `https://api.getpostman.com/environments/9563315-ace70801-6d11-4504-b96a-b2cfabb9abf9?apikey=${process.env.POSTMAN_API_KEY}`,
    reporters: 'cli'
}, (err) => {
    if(err) { throw err; }  
    console.log("Newman Runner Complete!");
})