const express = require("express");
const app = express();
const PORT = 5005;

app.get("/", (req, rep) => {
    rep.send("App Init TEST")
});

app.get("/appointments", (req, res) => {
    res.json([{Year: "2020", Mouth: "July",Day:' Hour: "15:00"}])
})

app.get("/appointments/:agent", (req, res) => {
    res.send(`Returns the agent with ID: ${req.params.agent}`)
})

app.post("/appointments", (req, res) => {
    console.log(req.body)
    res.send("Posts an Appointment")
})

app.put("/appointments/:id", (req, res) => {
    res.send("Updates an appointment")
})

app.delete("/appointment/:id", (req, res) => {
    res.send("Deletes an appointment")
})

app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`) });