const express = require("express");
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/timer.html');
});

app.use("/public", express.static("public")); // middleware til at serve static filer (lydklip)











app.listen(port, () => console.log(`Server is running on port: ${port}`));