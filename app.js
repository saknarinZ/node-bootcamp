const fs = require('fs')
const express = require('express');
const { ESRCH } = require('constants');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
// res.status(404).json({ message: ' Hello from the server side!', app: 'Natours'});
// })

// app.post('/', (req, res) => {
//     res.send('You con post to this endpoint...');
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });

});


app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    // if(id > tours.length) {
    if (!tour) {
        //404 Not Fountd
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour // ข้อมูลจากการขค้นหา
        }
    });
});


app.post('/api/v1/tours', (req, res) => {
    //   console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), arr => {
        res.status(201).json({
            status: 'success',
            data: {
                tours: newTour
            }
        });
    });

});

app.patch('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);
    if (req.params.id * 1 > tours.length) {
        //404 Not Fountd
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    res.status(200).json({
        status: 'seccess',
        data: {
            tour: '<Updated touer here...>'
        }
    })
})


app.delete('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);
    if (req.params.id * 1 > tours.length) {
        //404 Not Fountd
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    // 204 NO Cantent
    res.status(204).json({
        status: 'seccess',
        data: null
    })
})




const port = 3000;
app.listen(port, () => {
    console.log(`app runing on port ${port}...`);
})