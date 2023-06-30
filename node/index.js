const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const flightRouter = require('./routes/flight');
const airportRouter = require('./routes/airport');

app.get('/', (req, res) => {
    res.json({ message: 'alive' });
});

app.use('/flight', flightRouter);
app.use('/airport', airportRouter);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
