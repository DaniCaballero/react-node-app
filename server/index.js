const express = require('express');
const bodyParser = require("body-parser");
const checkroute = require("./router");
const cors = require("cors");
const port = 3001;

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.use("/", checkroute);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});