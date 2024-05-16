// Import required modules
const express = require('express');
const cors = require('cors');
const bodyparser = require("body-parser");
const db = require("./models");
const defaultData = require("./insertDefaultData");

// info

// Import router
const pemakaiRouter = require("./routes/pemakaiRouter");
const provinsiRouter = require("./routes/provinsiRouter");
const kontrasepsiRouter = require("./routes/kontrasepsiRouter");

// Setup express
const app = express();
const PORT = process.env.PORT || 8080

// Connect to DB
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    defaultData();
});

// Set middleware to process form data
app.use(express.urlencoded({extended: false}));

// Use CORS for Cross Origin Resource Sharing
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Parse JSON objects in request bodies
app.use(express.json())

// Route
app.use("/api/pemakai", pemakaiRouter);
app.use("/api/provinsi", provinsiRouter);
app.use("/api/kontrasepsi", kontrasepsiRouter);

app.get('/', (req, res) => res.send('Soal Test Programmer Model 1'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));