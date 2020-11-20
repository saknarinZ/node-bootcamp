const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


exports.checkID = (req, res, next, val) => {
    console.log(`Tour is is: ${val}`);
    if (req.params.id * 1 > tours.length) {
        //404 Not Fountd
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
}

exports.getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    res.status(200).json({
        status: 'success',
        data: {
            tour // ข้อมูลจากการขค้นหา
        }
    });
}

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
    // 204 NO Cantent
    res.status(204).json({
        status: 'seccess',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

exports.deleteTour = (req, res) => {
    // 204 NO Cantent
    res.status(204).json({
        status: 'seccess',
        data: null
    })
}