const express = require("express");
const cors=require("cors");
const mainRouter=require("./routes");

const app=express();

app.use(cors());
app.use(express.json());


app.use("/api/v1",mainRouter);
// app.use(mainRouter);
app.listen(3000);



