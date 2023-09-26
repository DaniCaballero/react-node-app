const express = require('express');
const port = 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({message : "Hola desde el servidor!"});
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});