const express = require('express');
const app = express();
const port = 3003 || process.env.PORT;
const flightRouter = require('./routes/flight');
const airportRouter = require('./routes/airport');
const flightConnectionRouter = require('./routes/flight-connections');
var cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'alive' });
});

app.use('/flight-connection', flightConnectionRouter);
app.use('/flight', flightRouter);
app.use('/airport', airportRouter);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
