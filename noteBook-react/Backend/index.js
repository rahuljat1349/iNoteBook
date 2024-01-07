const dbConnect = require("./db");
const express = require("express");
dbConnect();

const app = express();
const port = 8000;

// Avilable Routes
app.use("/api/auth", require("./routes/auth"));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`srever is listening on post ${port}`);
});
