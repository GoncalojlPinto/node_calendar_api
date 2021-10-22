const express = require("express");
const app = express();
const PORT = 5005;

app.get("/", (req, rep) => {
    rep.send("App Init TEST")
});

app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`) });