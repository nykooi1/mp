// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

//testing
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


//listening
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

