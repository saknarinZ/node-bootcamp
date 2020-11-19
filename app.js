const fs = require('fs')
const express = require('express');
const morgan = require('morgan');

const app = express();


// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next)=>{
    console.log('hello from the middleware');
    next();
})

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));



// 2)  ROUTE HANDERS
const getAlltours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime, 
        results: tours.length,
        data: {
            tours
        }
    });
}

const getTour = (req, res) => {
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
}

const createTour = (req, res) => {
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

}

const updateTour = (req, res) => {
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
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

const deleteTour = (req, res) => {
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
}

// app.get('/api/v1/tours', getAlltours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);


// 3)  ROUTES
app.route('/api/v1/tours')
.get(getAlltours)
.post(createTour);



app.route('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour);


// 4)  START  SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`app runing on port ${port}...`);
})