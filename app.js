const fs = require('fs')

const express = require('express');

const app = express();

// app.get('/', (req, res) => {
// res.status(404).json({ message: ' Hello from the server side!', app: 'Natours'});
// })

// app.post('/', (req, res) => {
//     res.send('You con post to this endpoint...');
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req , res ) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
    console.log(tours);
})


const port = 3000;
app.listen(port, () => {
    console.log(`app runing on port ${port}...`);
})